<template>
  <div class="ratings">
    ratings
    <div class="content">
      <rating-type></rating-type>
      <b-scroll class="list" :data="ratings">
<!--         <div class="list-item" v-for="item in ratings">
          <div class="top">
            <div class="user">
              <div class="user-avatar"><img :src="item.avatar" alt=""></div>
              <div class="right">
                <div class="user-name">{{item.username}}</div>
                <div class="star">asdf</div>
              </div>
            </div>
            <div class="date">1212124124</div>
          </div>

          <div class="bottom">
            <div class="text">{{item.text}}</div>
            <div class="labels"></div>
          </div>
        </div> -->
      </b-scroll>
    </div>
  </div>
</template>
<script>
import RatingType from 'components/rating-type/rating-type.vue'
import BScroll from 'base/b-scroll/b-scroll.vue'
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
    RatingType,
    BScroll 
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'

.ratings
  display flex
  flex-direction column
  width 100%
  .list
    flex 1
    width 100%
    background red
    overflow-y auto
    .list-item
      box-sizing border-box
      padding 36px
      height 263px
      border-1px-t(#e6e7e8)
      display flex
      flex-direction column
      color #07111b
      .top
        display flex
        justify-content space-between
        font-size 20px
        .user
          display flex
          .user-avatar
            width 60px
            height 60px
            border-radius 50%
            overflow hidden
            margin-right 24px
            img
              width 100%
              height 100%
          .right
            display flex
            flex-direction column
            div
              flex 1
              display flex
              align-items center
        .date
          color #93999f
      .bottom
        margin-top 12px
        padding 0 10px 0 80px
        .text
          font-size 24px
          line-height 40px
</style>
