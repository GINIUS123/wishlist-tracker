const cron = require('node-cron');
const WishlistItem = require('../models/WishlistItem');
const fetchPriceWithPlaywright = require('./priceChecker');
const { sendPriceDropEmail } = require('./emailService');
const User = require('../models/User');

// Runs every 6 hours
cron.schedule('0 */6 * * *', async () => {
  console.log('⏱ Running scheduled price check...');

  const items = await WishlistItem.find();

  for (const item of items) {
    try {
      const result = await fetchPriceWithPlaywright(item.url);
      if (!result) continue;

      const { price, currency } = result;
      const lastPriceEntry = item.priceHistory.at(-1);

      if (!lastPriceEntry || lastPriceEntry.price !== price) {
        await WishlistItem.findByIdAndUpdate(item._id, {
          $push: { priceHistory: { price, currency, date: new Date() } },
        });
        console.log(`✔ Price updated for: ${item.url}`);

        if (lastPriceEntry && price < lastPriceEntry.price) {
          const user = await User.findById(item.userId);
          if (user) {
            await sendPriceDropEmail(user.email, item.url, lastPriceEntry.price, price);
            console.log(`📩 Sent email to ${user.email}`);
          }
        }
      } else {
        console.log(`🔁 No change for ${item.url}`);
      }
    } catch (err) {
      console.error(`❌ Error updating ${item.url}:`, err.message);
    }
  }
});
