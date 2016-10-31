<template>
  <div class="other-page">
    <div class="header-topbar pink">
      <div class="content">
        <a v-link="{'path':'/index'}" title="UX Research" class="logo">Reports</a>
        <a href="javascript:;" title="Menu" class="menu-btn" @click="openMenu">Menu <i class="ion-android-menu"></i></a>
      </div>
    </div>
    <div class="content">
      <div class="report-wrap">
        <div class="report-filter">
          <span :class="{'active': filter == 'all'}" @click="filterChange('all')"><i class="icon-sm icon-sm-doc"></i>All</span>
          <span :class="{'active': filter == 'bing'}" @click="filterChange('bing')"><i class="icon-sm icon-sm-bing"></i>Bing</span>
          <span :class="{'active': filter == 'cortana'}" @click="filterChange('cortana')"><i class="icon-sm icon-sm-cortana"></i>Cortana</span>
          <span :class="{'active': filter == 'bot'}" @click="filterChange('bot')"><i class="icon-sm icon-sm-bot"></i>Bot</span>
        </div>
        <div class="tips" v-show="!result.length">
          No results
        </div>
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
        <!--
        <div class="list-page" v-show="filter == 'all'&&result.length>0">
          <strong class="prev">&lsaquo;</strong>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <strong class="next">&rsaquo;</strong>
          <strong>({{Math.floor(total/pageLen)+1}} pages)</strong>
        </div>
-->
      </div>
    </div>
    <div class="other-link">
      <div class="content">
        <div class="other-link-wrap">
          <dl>
            <dt><i class="ion-ios-world-outline"></i>Global Research Team</dt>
            <dd><a href="javascript:;">Bing research in Bellevue</a></dd>
            <dd><a href="javascript:;">OXO research team</a></dd>
            <dd><a href="javascript:;">OSG research team</a></dd>
          </dl>
          <dl>
            <dt><i class="ion-stats-bars"></i>Market Research</dt>
            <dd><a href="javascript:;">CNNIC</a><a href="javascript:;">umeng</a></dd>
            <dd><a href="javascript:;">Talking Data</a><a href="javascript:;">Analysys</a></dd>
            <dd><a href="javascript:;">iResearch</a></dd>
          </dl>
        </div>
      </div>
    </div>
    <ux-foot></ux-foot>
  </div>
</template>

<script>
import { util, event, request } from '../services/index'
import UxFoot from './UxFoot.vue'
export default {
  data() {
    return {
      pageLen: 10,
      filter: '',
      result: [],
      total: 0,
      current: 1
    }
  },
  ready() {
    const type = this.$route.query.type+""
    this.filterChange(/^(bing|cortana|bot)$/.test(type)?type:'all')
  },
  methods: {
    openMenu(){
      util.openMenu()
    },
    filterChange(f){
      if (f == this.filter) {
        return
      }
      this.filter = f
      let query = {}, maps = {
        'bing': 0,
        'cortana': 1,
        'bot': 2
      }
      if(f !== "all"){
        query.category = maps[f]
      }
      request.getReportList(query)
        .then((res) => {
            if(res.success){
              this.result = f=="all"?res.data.result:res.data
            }
        }).catch((err) => {

        })
    },
    getWordName(ws){
      return (ws || []).map(item => {
        return item.name
      }).join(",")
    },
    format(d){
      return 'undefined' == typeof d ? "" : util.format(new Date(d), 'yyyy-MM-dd')
    }
  },
  components: {
    UxFoot
  }
};
</script>

<style lang="stylus">
@import "../stylus/_settings.styl"
.pink
  box-shadow 0 1px 8px rgba(0,0,0,.2)
.report-wrap
  padding 70px
.report-filter
  padding-bottom 30px
  span
    cursor pointer
    display inline-box
    padding 3px 35px
    border-left 1px solid #979797
    &:first-child
      padding-left 0
      border 0 none
    i
      margin-right 10px
  .active
    font-weight bold
    color $pink
.other-link
  background-color #D8D8D8
  .other-link-wrap
    padding 40px 70px
    display flex
    dl
      flex 1
      margin 0
      dt
        color #aaa
        line-height 50px
        i
          font-size 20px
          vertical-align middle
          margin-right 10px
      dd
        color #535353
        padding 8px 0 8px 28px
        margin-left 0
        display flex
        a
          flex 1
          &:hover
            text-decoration underline
</style>
