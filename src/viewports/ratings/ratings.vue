<template>
  <div class="ratings">
    ratings
    <div class="content">
      <!-- <ratings :data="ratings"></ratings> -->
    </div>
  </div>
</template>
<script>
// import Ratings from 'components/ratings/ratings.vue'
import {ERR_OK} from 'api/config.js'

export default {
  data () {
    return {
      ratings: []
    }
  },
  mounted(){
    this.$http.get('api/ratings').then((res) => {
      let response = res.data
      if (response.errno === ERR_OK) {
        this.ratings = response.data
      }
    })
  },
  components: {
    // Ratings
  }
}
</script>
<style lang="stylus">

</style>
