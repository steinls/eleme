<template>
  <b-scroll class="ratings">
    <rating-type @change="select" @filterEmpty="filterEmpty" :data="ratings" :type="['全部','满意','不满意']"></rating-type>
    <div class="list" :data="ratings">
      <div class="list-item" v-for="(item, key) in ratings" :key="key" v-if="showType(item.rateType, item.text)">
        <div class="top">
          <div class="user">
            <div class="user-avatar"><img :src="item.avatar" alt=""></div>
            <div class="right">
              <div class="user-name">{{item.username}}</div>
              <div class="star">asdf</div>
            </div>
          </div>
          <div class="date">{{item.rateTime | toDate}}</div>
        </div>

        <div class="bottom">
          <div class="text">{{item.text}}</div>
          <div class="labels"></div>
        </div>
      </div>
    </div>
  </b-scroll>
</template>
<script>
import RatingType from 'components/rating-type/rating-type.vue'
import BScroll from 'base/b-scroll/b-scroll.vue'
import {ERR_OK} from 'api/config.js'
import {ratingTypeMixin} from 'vmixin/mixin.js'

export default {
  mixins: [ratingTypeMixin],
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
        console.log(this.ratings)
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
  position fixed
  top 352px
  left 0
  right 0
  bottom 96px
  display flex
  flex-direction column
  overflow auto
  .list
    flex 1
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
