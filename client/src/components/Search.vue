<template>
  <div class="index-search" :style="{'height': resultH}">
    <div class="content">
      <div class="search-tip" v-show="tips">{{tips}}</div>
      <div class="search-result" :class="{'showsearch': !tips}">
        <ul class="report-list">
          <li v-for="item in result">
            <div class="list-head {{['bing','cortana','bot'][item.category]}}">
              <i class="icon-{{['bing','cortana','bot'][item.category]}}"></i>
              <span>{{item.title}}</span>
            </div>
            <h3>{{item.title}}</h3>
            <p><i class="ion-pricetag"></i>{{getWordName(item.keywords)}}</p>
            <p><i class="ion-ios-clock"></i>{{format(item.time)}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { util, event, request } from '../services/index'

export default {
  data() {
    return {
      tips: " ",
      result: [],
      winW: window.innerWidth,
      winH: window.innerHeight,
      resultH: 0+"px"
    }
  },
  ready() {
    event.on('search', this.search)
    window.addEventListener('resize', this.resize)
    this.$el.querySelector('.search-result').addEventListener(util.transitionEndEvent, this.transitionEnd)
  },
  beforeDestroy () {
    this.tips = " "
    event.off('search', this.search)
    window.removeEventListener('resize', this.resize)
    this.$el.querySelector('.search-result').removeEventListener(util.transitionEndEvent, this.transitionEnd)
  },
  methods: {
    search(query){
      if(this.tips == "Loading…" || !query)return
      this.resultH = (window.innerHeight - 350) + "px"
      this.tips = "Loading…"
      setTimeout(() => {
        request.getReportList({query,})
          .then((res) => {
              if(res.success){
                if(!res.data.length){
                  this.tips = "No results"
                  return
                }
                this.result = res.data
                this.tips = ""
                this.$el.querySelector('.search-result').style.visibility = 'visible'
              }else{
                throw 'error'
              }
          }).catch((err) => {
              this.tips = "search error"
          })
      }, 500)
    },
    resize() {
      this.winW = window.innerWidth
      this.winH = window.innerHeight
    },
    getWordName(ws){
      return (ws || []).map(item => {
        return item.name
      }).join(",")
    },
    format(d){
      return 'undefined' == typeof d ? "" : util.format(new Date(d), 'yyyy-MM-dd')
    },
    transitionEnd(){
      if(this.tips){
        this.$el.querySelector('.search-result').style.visibility = 'hidden'
      }
    }
  }
};
</script>

<style lang="stylus">
@import "../stylus/_settings.styl"
.showsearch.search-result
  transform translateY(0)
  opacity 1
.search-result
  margin 0 30px
  color #fff
  visibility hidden
  transform translateY(80px)
  opacity 0
  transition all 400ms 100ms
.index-search
  z-index 5
  position absolute
  bottom 0
  left 0
  right 0
  overflow-x hidden
  overflow-y scroll
  .content
    height 100%
  .search-tip
    position absolute
    top -20px
    left 0
    right 0
    font-size 16px
    color #fff
    text-align center
  .report-list
    li
      &:hover
        background-color rgba(0,0,0,.3)
        box-shadow 3px 5px 22px rgba(0,0,0,0)
</style>
