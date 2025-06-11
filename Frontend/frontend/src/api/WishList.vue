<template>
  <div>
    <h1>🎯 Wishlist Tracker</h1>
    <ul>
      <li v-for="item in wishlist" :key="item._id">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">
          {{ item.url }}
        </a>
        <p>
          Latest Price: €
          {{ item.priceHistory.length > 0 
            ? item.priceHistory[item.priceHistory.length - 1].price.toFixed(2)
            : 'N/A' 
          }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'WishList',
  data() {
    return {
      wishlist: [],
      userId: '681d44152d8a2cf195495119' // Hardcoded user ID
    }
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:5000/api/wishlist/${this.userId}`)
      this.wishlist = res.data
    } catch (error) {
      console.error('Failed to fetch wishlist:', error)
    }
  }
}
</script>
