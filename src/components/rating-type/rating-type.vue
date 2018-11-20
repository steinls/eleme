<template>
  <div class="rating-type">
    <div class="title">商品评价</div>
    <div class="types">
      <div class="type-item" :class="{active: selectType === ALL}" @click="select(ALL)">
        <div>{{type[0]}}<span>{{all.length}}</span></div>
      </div>
      <div class="type-item" :class="{active: selectType === FINE}" @click="select(FINE)">
        <div>{{type[1]}}<span>{{fine.length}}</span></div>
      </div>
      <div class="type-item" :class="{active: selectType === BAD}" @click="select(BAD)">
        <div>{{type[2]}}<span>{{bad.length}}</span></div>
      </div>
    </div>
    <div class="only-content" :class="{active: onlycontent}" @click="tagOnlyContent()">
      <i class="icon icon-check_circle"></i>
      <div class="text">只看有内容的评价</div>
    </div>
  </div>
</template>
<script>

const ALL = 2
const FINE = 0
const BAD = 1

export default {
  props: {
    data: {
      type: Array,
      default(){
        return []
      }
    },
    type: {
      type: Array,
      default(){
        return ['全部', '推荐', '吐槽']
      }
    },
    selected: {
      type: Number,
      default: ALL
    },
    filterEmpty: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      selectType: this.ALL,
      onlycontent: false
    }
  },
  created(){
    this.ALL = ALL
    this.FINE = FINE
    this.BAD = BAD

    // 根据数据分类进行统计数量
    this.all = this.data
    this.fine = this.data.filter((item) => {
      return item.rateType === this.FINE
    })
    this.bad = this.data.filter((item) => {
      return item.rateType === this.BAD
    })
  },
  mounted(){
    // 根据传入的参数进行初始化
    this.selectType = this.selected
    this.onlycontent = this.filterEmpty
  },
  methods: {
    select(type){
      this.selectType = type

      this.$emit('change', type)
    },
    tagOnlyContent(){
      this.onlycontent = !this.onlycontent

      this.$emit('filterEmpty', this.onlycontent)
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'

.rating-type
  margin-top 32px
  box-sizing border-box
  height 301px
  border-top 2px solid #e6e7e8
  border-bottom 2px solid #e6e7e8
  background #ffffff
  padding 34px 36px 0px 36px
  display flex
  flex-direction column
  .title
    font-size 28px
    color #07111b
    font-weight 500
  .types
    margin-top 36px
    height 64px
    display flex
    .type-item
      margin-right 16px
      height 64px
      width 120px
      background #ccecf8
      border-radius 2px
      color #4d555d
      font-size 24px
      display flex
      justify-content center
      align-items center
      span
        margin-left 8px
        font-size 18px
      &.active
        background #00a0dc
        color #ffffff
      &:last-child
        background #e9ebec
        &.active
          background #93999f
  .only-content
    flex 1
    border-1px-t(#e6e7e8)
    margin-top 36px
    display flex
    align-items center
    .icon
      font-size 40px
      margin-right 12px
      margin-left 4px
      color #b7bbbf
    .text
      color #93999f
      font-size 24px
    &.active
      .icon
        color #00c850
</style>
