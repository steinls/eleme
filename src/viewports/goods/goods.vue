<template>
  <div class="goods">
    <div class="menu">
      <!-- 菜单 -->
      <b-scroll class="kinds-wrap" :data="goods">
        <ul class="kinds">
          <li class="kinds-item" v-for="(item,key) in goods" :key="key" @click="selectKind(key)" :class="{active:select===key}">
            <div class="cont">
              <div class="text">
                <brand-map v-if="item.type!==-1" :type="item.type"></brand-map>
                {{item.name}}
              </div>
            </div>
          </li>
        </ul>
      </b-scroll>

      <!-- 菜品种类 -->
      <b-scroll class="dishe-kinds" ref="disheKinds" :data="goods" :listenScroll="true" @scroll="scroll" :listenScrollEnd="true" @scrollEnd="scrollEnd">
        <div class="dishes" ref="kindItem" v-for="(kind,key) in goods" :key="key">
          <!-- 种类标题 -->
          <h3 class="dishes-title">{{kind.name}}</h3>
          <!-- 某种类菜品列表 -->
          <div class="dishes-item" v-for="(dishe,key) in kind.foods" :key="key">
            <div class="img">
              <img :src="dishe.image" alt="">
            </div>
            <div class="cont">
              <div class="dishe-name">{{dishe.name}}</div>
              <div class="remark" v-if="dishe.description">{{dishe.description}}</div>
              <!-- <div class="info">{{dishe.info}}</div> -->
              <div class="sales">
                <div class="sell">月售{{dishe.sellCount}}份</div>
                <div class="praise">好评率{{dishe.rating}}%</div>
              </div>
              <div class="price-wrap">
                  <span class="price"><i>￥</i>{{dishe.price}}</span>
                  <span class="old-price" v-if="dishe.price !== dishe.price">￥{{dishe.price}}</span>
              </div>
            </div>
            <count-control :select-foods="selectFoods" :food="dishe"></count-control>
          </div>

        </div>
      </b-scroll>
    </div>
    <shopcart :goods="selectFoods" :min-price="seller.minPrice" :surcharge="seller.deliveryPrice"></shopcart>
  </div>
</template>
<script>
import {ERR_OK} from 'api/config.js'
import BrandMap from 'components/brand-map/brand-map.vue'
import BScroll from 'base/b-scroll/b-scroll.vue'
import Shopcart from 'components/shopcart/shopcart.vue'
import CountControl from 'components/count-control/count-control.vue'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      select: 0,
      selectFoods: []
    }
  },
  created() {
    this.lock = true
    this.heightGroup = []

    this.$http.get('api/goods').then((res) => {
      let data = res.data
      if (data.errno === ERR_OK){
        this.goods = data.data
        console.log('---goods----')
        console.log(this.goods)
      }
    })
  },
  methods: {
    selectKind(key){
      this.select = key
      this.lock = true
      this.$refs.disheKinds.scrollToElement(this.heightGroup[key].el, 300)
    },
    scroll(pos){
      if (this.lock) {
        return
      }

      let idx = 0
      this.heightGroup.forEach((v, k) => {
        if (pos.y <= -v.limit) {
          idx = k
        }
      })

      this.select = idx
    },
    scrollEnd() {
      this.lock = false
    }
  },
  components: {
    BrandMap,
    BScroll,
    Shopcart,
    CountControl
  },
  watch: {
    goods() {
      this.$nextTick(() => {
        let limit = 0
        this.$refs.kindItem.forEach((v) => {
          this.heightGroup.push({
            limit,
            el: v
          })
          limit += v.clientHeight
        })
      })
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'

.goods
  position absolute
  top 350px
  left 0
  right 0
  bottom 0
  .menu
    display flex
    position absolute
    bottom 97px
    top 0
    left 0
    right 0
    .kinds-wrap
      height 100%
      width 161px
      overflow auto
      .kinds
        background #f3f5f7
        box-sizing border-box
        overflow auto
        font-size 22px
        line-height 32px
        .kinds-item
          display flex
          align-items center
          height 109px
          color #07111b
          padding 0 23px
          border-1px-t(#dbdee1)
          &:after
            width 112px
            left 50%
            margin-left -56px
          &:first-child:after
            display none
          &.active
            background #ffffff
            &:after
              display none
          &.active+.kinds-item:after
            display none
          .cont
            .brand-map
              display inline-block
              position relative
              top 4px

    .dishe-kinds
      overflow-y auto
      flex 1
      .dishes
        .dishes-title
          height 52px
          line-height 52px;
          font-size 24px
          box-sizing border-box
          border-left 4px solid #d9dde1
          padding-left 24px
          background #f3f5f7
        .dishes-item
          display flex
          padding 36px 40px 36px 36px
          border-1px-b(#d9dde1)
          &:after
            width calc(100% - 76px)
            margin-left 36px
          &:last-child:after
            display none
          .img
            width 114px
            height 114px
            border-radius 2px
            overflow hidden
            margin-right 18px
            img
              width 100%
              height 100%
          .cont
            display flex
            flex-direction column
            flex 1
            .dishe-name
              height 28px
              line-height 28px
              font-size 28px
              color #07111b
            .remark,.sales
              font-size 18px
              line-height 24px
              color #93999f
              margin-top 16px
            .sales
              line-height 18px
              display flex
              .sell
                margin-right 24px
            .price-wrap
              display flex
              margin-top 16px
              height 22px
              .price
                color #f01414
                font-size 22px
                i
                  font-style normal
                  font-size 16px
              .old-price
                font-size 16px
            .count
              display flex
              position absolute
              bottom 36px
              right 40px

</style>
