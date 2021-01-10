<template>
  <div id="app" @click='hideOpenWindow'>
    <TheHeader />
    <router-view/>
  </div>
</template>

<script>
import TheHeader from "@/components/header/";
import {bus} from "@/main"

export default {
  components: {TheHeader},
  methods: {
    hideOpenWindow(){
      bus.$emit('hideBurger');
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: right;
  color: #2c3e50;
}

</style>
