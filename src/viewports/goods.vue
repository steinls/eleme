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
    <div class="dishes"></div>
  </div>
</template>
<script>
import {ERR_OK} from 'api/config.js'
import BrandMap from '../components/brand-map/brand-map.vue'

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
        console.log('-----------')
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
@import '../common/stylus/mixin.styl'

.goods
  display flex
  position absolute
  top 351px
  bottom 97px
  left 0
  right 0
  background red
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
  .dishes
    flex 1
</style>
