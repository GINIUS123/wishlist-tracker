<template>
  <form @submit.prevent="addItem">
    <input v-model="productUrl" placeholder="Amazon Produkt-URL" required />
    <button type="submit">➕ Hinzufügen</button>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return { productUrl: '', userId: '681d44152d8a2cf195495119' }
  },
  methods: {
    async addItem() {
      try {
        await axios.post(`http://localhost:5000/api/wishlist`, {
          userId: this.userId,
          url: this.productUrl  // ✅ Correct key name
        })
        this.$emit('item-added') // Let parent refresh
        this.productUrl = ''
      } catch (err) {
        alert('Fehler beim Hinzufügen.')
        console.error(err)
      }
    }
  }
}
</script>
