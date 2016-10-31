<template>
  <div class="index-wrapper" :class="{'search': isSearch, 'ready': isReady}">
      <header class="index-header" :style="{'height': headH}">
        <div class="header-bg"></div>
        <!--<div class="header-bg header-ef"></div>-->
        <div class="content">
          <div class="header-topbar">
            <a v-link="{'path':'/index'}" title="UX Research" class="logo">UX Research</a>
            <a href="javascript:;" title="Menu" class="menu-btn" @click="openMenu">Menu <i class="ion-android-menu"></i></a>
          </div>
          <div class="index-header-main">
            <div class="index-header-text">
              <strong>Hello, we are</strong>
              <h1>Studio 8 User Research</h1>
              <p>
                We have conducted studies with hundreds of users in the lab or in their real environments.
              </p>
            </div>
            <div class="search-box">
              <i class="ion-ios-search"></i>
              <input type="text" placeholder="Search reports" v-model="query" @focus="focusInput" @keyup.13="searchQuery">
            </div>
            <ul class="search-tags">
              <li v-for="item in keywords" @click="clickKeyword(item.name)"><span>{{item.name}}</span><span>{{item.count}}</span></li>
            </ul>
          </div>
        </div>
      </header>
      <router-view></router-view>
    </div>
</template>

<script>
import { util, event, request } from '../services/index'
const headBg = '../assets/img/head-bg.png'
let wrapper, input, tags, text
export default {
  data() {
    return {
      isSearch: false,
      isSerp: false,
      isReady: false,
      query: "",
      keywords: [],
      headH: (window.innerHeight - 120)+'px',
      winW: window.innerWidth,
      winH: window.innerHeight
    }
  },
  ready() {
    wrapper = document.querySelector('.wrapper')
    tags = this.$el.querySelector('.search-tags')
    text = this.$el.querySelector('.index-header-text')
    if(this.$route.path == '/index/search'){
      text.style.visibility = "hidden"
      tags.style.visibility = "visible"
    }else{
      text.style.visibility = "visible"
      tags.style.visibility = "hidden"
    }
    this.isReady = true
    window.addEventListener('resize', this.resize)
    tags.addEventListener(util.transitionEndEvent, this.transitionEnd)
    request.getKeyWords().then((res) => {
      if(res.success){
        this.keywords = res.data
      }
    }).catch(() => {
      console.log('error');
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
    tags.removeEventListener(util.transitionEndEvent, this.transitionEnd)
  },
  route: {
    data(o){
      if(o.to.path == '/index'){
        text && (text.style.visibility = "visible")
        this.isSearch = false
        this.isSerp = false
        this.query = ""
        this.headH = (this.winH-120) + 'px'
        setTimeout(() => {
          wrapper.classList.remove('sresult')
        }, 200)
        this.$el.querySelector('input').blur()
      }else if(o.to.path == '/index/search'){
        tags && (tags.style.visibility = "visible")
        this.isSearch = true
        this.headH = this.winH + 'px'
        this.$el.querySelector('input').focus()

      }
    }
  },
  methods: {
    resize(){
      this.winW = window.innerWidth
      this.winH = window.innerHeight
    },
    focusInput(){
      if(this.$route.path != '/index/search'){
        this.$router.go('/index/search')
      }
    },
    clickKeyword(word){
      if (this.query == word) {
        return
      }
      this.query = word
      this.searchQuery()
    },
    searchQuery(){
      if(!this.isSerp){
        this.isSerp = true
        wrapper.classList.add('sresult')
        setTimeout(() => {
          this.headH = this.winH + 'px'
        }, 100)
      }
      event.trigger('search', this.query)
    },
    openMenu(){
      util.openMenu()
    },
    transitionEnd(){
      if(this.isSearch){
        text.style.visibility = "hidden"
      }else{
        tags.style.visibility = "hidden"
      }
    }
  }
};
</script>

<style lang="stylus">
@import "../stylus/_settings.styl"
.sresult
  overflow hidden
  .header-ef
    filter blur(10px)
    transform scale(1.2)
  .index-header
    overflow hidden
    .index-header-main
      top 225px
.index-wrapper
  height 100%
  .index-header
    .content
      height 100%
      position absolute
      top 0
      bottom 0
      left 50%
      transform translateX(-50%)
      z-index 3
.header-ef
  position absolute
  left 0
  right 0
  bottom 0
  top 0
  filter blur(0px)
  transform scale(1)
  transition all 200ms 100ms
  z-index 1
.ready
  .header-bg
    transform scale(1)
.header-bg
  width 100%
  height 100%
  transition transform 1.5s ease
  transform scale(1.2)
  background-image url(../assets/img/head-bg.png)
  background-attachment fixed
  background-position center
  background-repeat no-repeat
  background-size cover
  will-change transform
  &:before
    content " "
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    z-index 1
    background rgba(0,0,0,.6)
.index-wrapper.search
  .search-box
    transform translate3d(100px,-190px,0) scale(2.5)
  .index-header-text
    opacity 0
    filter blur(40px)
    transform scale(3)
  .search-tags
    opacity 1
    transform translateY(0)

.index-header
  transition height 200ms
  position relative
  color #fff
  .search-tags
    position absolute
    padding 0
    left 100px
    top 110px
    overflow hidden
    opacity 0
    transform translateY(100px)
    transition all 300ms
    li
      line-height 32px
      height 32px
      padding 0 15px
      list-style none
      cursor pointer
      float left
      margin 25px 25px 0 0
      border-radius 160px
      transition all 400ms
      border 1px solid rgba(255,255,255,.5)
      span
        display block
        line-height 30px
        transition all 120ms
        text-align center
      span:first-child
        transform translateY(0)
        opacity 1
      span:last-child
        transform translateY(-60%)
        opacity 0
      &:hover
        background $pink
        border-color $pink
        span:first-child
          transform translateY(-40%)
          opacity 0
        span:last-child
          transform translateY(-100%)
          opacity 1
  .index-header-main
    z-index 1
    height 270px
    transition top 200ms
    position absolute
    top 50%
    margin-top -135px
    left 110px

  .search-box
    transform-origin 0
    transform translate3d(0,0,0) scale(1)
    transition all 400ms
    position absolute
    left 0
    top 250px
    display flex
    align-items center
    height 22px
    i
      font-size 28px
      padding-left 2px
    input
      border 0 none
      background none
      flex 1
      padding-left 10px
      font-size 15px
      color #fff
  .index-header-text
    opacity 1
    filter blur(0px)
    transform scale(1)
    transition all 500ms
    strong
      font-size 25px
    h1
      font-size 80px
      margin 18px 0
    p
      font-size 20px

.tags-transition
  opacity 1
  transform translateY(0)
  transition all 300ms
.tags-enter,.tags-leave
  opacity 0
  transform translateY(100px)


</style>
