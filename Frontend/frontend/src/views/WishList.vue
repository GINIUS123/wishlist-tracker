<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const wishlist = ref([])
const newUrl = ref('')
const userId = '681d44152d8a2cf195495119'

const fetchWishlist = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/wishlist/${userId}`)
    wishlist.value = res.data
  } catch (err) {
    console.error('Failed to fetch wishlist:', err)
  }
}

const addToWishlist = async () => {
  if (!newUrl.value.trim()) {
    alert('Bitte gib eine Produkt-URL ein!')
    return
  }

  try {
    await axios.post('http://localhost:5000/api/wishlist', {
      productUrl: newUrl.value,
      userId: userId
    })
    newUrl.value = ''
    await fetchWishlist()
  } catch (err) {
    console.error('Failed to add product:', err)
  }
}

const deleteItem = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/wishlist/${id}`)
    await fetchWishlist()
  } catch (err) {
    console.error('Failed to delete item:', err)
  }
}

const totalValue = computed(() => {
  return wishlist.value.reduce((acc, item) => {
    const latestPrice = item.priceHistory?.length
      ? item.priceHistory[item.priceHistory.length - 1].price
      : 0
    return acc + latestPrice
  }, 0).toFixed(2)
})

onMounted(fetchWishlist)
</script>



<style scoped>
input {
  padding: 8px;
  width: 300px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 14px;
  margin-left: 8px;
  font-size: 1rem;
  background-color: #2a9d8f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #21867a;
}

.delete-btn {
  background-color: #e76f51;
  margin-left: 12px;
}

.delete-btn:hover {
  background-color: #c94c3d;
}

ul {
  margin-top: 20px;
  padding-left: 20px;
}

li {
  margin-bottom: 12px;
  line-height: 1.4;
}
</style>
