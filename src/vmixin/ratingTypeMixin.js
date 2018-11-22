import {formatDate} from 'lib/date.js'
const ALL = 2
const FINE = 0
const BAD = 1

export const ratingTypeMixin = {
  data(){
    return {
      selectType: ALL,
      onlycontent: false
    }
  },
  created(){
    this.ALL = ALL
    this.FINE = FINE
    this.BAD = BAD
  },
  methods: {
    select(type){
      this.selectType = type
    },
    filterEmpty(tag){
      this.onlycontent = tag
    },
    showType(type, text){
      if (this.onlycontent && !text) return false
      if (this.selectType === ALL) {
        return true
      } else {
        return this.selectType === type
      }
    },
    isLaud(type){
      return type === 0 ? 'icon-thumb_up up' : 'icon-thumb_down down'
    }
  },
  filters: {
    toDate(val){
      let date = new Date(val)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
