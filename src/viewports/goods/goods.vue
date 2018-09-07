<template>
  <div class="goods">
    <div class="kinds-wrap">
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
    </div>
    <div class="dishe-kinds">
      <div class="dishes" v-for="(kind,key) in goods" :key="key">

        <h3 class="dishes-title">{{kind.name}}</h3>

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
            <div class="count">
              <div class="less">-</div>
              <div class="num">0</div>
              <div class="add">+</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import {ERR_OK} from 'api/config.js'
import BrandMap from 'components/brand-map/brand-map.vue'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      select: 0
    }
  },
  created() {
    this.$http.get('api/goods').then((res) => {
      let data = res.data
      if (data.errno === ERR_OK){
        this.goods = data.data
        console.log('goods-data---')
        console.log(data.data)
      }
    })
  },
  methods: {
    selectKind(key){
      this.select = key
    }
  },
  components: {
    BrandMap
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'

.goods
  display flex
  position absolute
  top 350px
  bottom 97px
  left 0
  right 0
  .kinds
    width 161px
    height 100%
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
        padding 36px
        border-1px-b(#d9dde1)
        &:after
          width calc(100% - 72px)
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
            line-height 18px
            height 18px
            color #93999f
            margin-top 16px
          .sales
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
