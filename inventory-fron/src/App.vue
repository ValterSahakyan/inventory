<template>
  <div id="app">
    <NavBar/>
    <LayoutComponent/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import LayoutComponent from "@/components/Layout";
export default {
  name: 'App',
  components: {
    NavBar,
    LayoutComponent
  },
  compatConfig: { MODE: 3 }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
