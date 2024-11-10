<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-image: url('../public/fondo.jpg');
  background-size: cover;
  background-position: center;
  color: #f1c40f;
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>