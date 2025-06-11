/* module.exports = {
    'www.amazon.de': {
      price: 'span.a-price .a-offscreen', // Amazon price selector
    },
  };
  */
 module.exports = {
  'www.amazon.de': {
    price: `
      #priceblock_ourprice, 
      #priceblock_dealprice, 
      span.a-price.a-text-price.a-size-medium.apexPriceToPay span.a-offscreen, 
      span.a-price.aok-align-center span.a-offscreen, 
      span.a-price .a-offscreen
    `
  },
  'amazon.de': {
    price: `
      #priceblock_ourprice, 
      #priceblock_dealprice, 
      span.a-price.a-text-price.a-size-medium.apexPriceToPay span.a-offscreen, 
      span.a-price.aok-align-center span.a-offscreen, 
      span.a-price .a-offscreen
    `
  }
};
