<template>
  <div id="app">
    <m-header :seller="seller"></m-header>
    <tab></tab>
    <keep-alive>
      <router-view :seller="seller"/>
    </keep-alive>
  </div>
</template>

<script>
import {ERR_OK} from 'api/config'

import MHeader from 'components/m-header/m-header.vue'
import Tab from 'components/tab/tab.vue'

export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      let data = response.body
      if (data.errno === ERR_OK) {
        this.seller = data.data
      }
    })
  },
  components: {
    MHeader,
    Tab
  }
}

</script>

<style lang="stylus">

</style>
