<template>
  <main>
    <form @submit.prevent="onSubmit">
      <input type="search" name="search" id="search" v-model="username" />
      <input type="submit" value="Submit" />
    </form>

    <ul>
      <li v-for="user in users" :key="user.id">{{ user.username }}</li>
    </ul>
  </main>
</template>

<script setup>
import { ref } from 'vue'

let username = ref(null)
let users = ref(null)
async function onSubmit() {
  if (username == '') {
    alert('Veuillez entrer un username')
    return
  }

  await fetch(`http://localhost:3000/users/?username=${username.value}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImFkbWluIjoxLCJpYXQiOjE3MTU3NjQ4NDIsImV4cCI6MTc0NzMyMjQ0Mn0.nI-5pzz1CWpQld1aXai0JPhYRnRxEEI7lokOhw0lqEE'
    }
  })
    .then((response) => response.json())
    .then((data) => users.value = data.data)
    .catch((error) => console.error('Error:', error))

  username.value = ''
}
</script>
