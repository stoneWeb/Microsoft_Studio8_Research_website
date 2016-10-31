<template>
  <nav class="menu">
    <div class="content">
      <header class="menu-header">
        <div class="menu-header-topbar">
          <a href="javascript:;" title="UX Research" class="menu-logo">Menu</a>
          <a href="javascript:;" title="Menu" class="menu-btn" @click="closeMenu"><i class="ion-android-close"></i></a>
        </div>
      </header>
      <div class="menu-content">
        <dl>
          <dt>Resource</dt>
          <dd><a v-link="{'path': '/reports'}">Research Reports</a></dd>
          <dd><a href="javascript:;">Useful Links</a></dd>
        </dl>
        <dl>
          <dt>About us</dt>
          <dd><a v-link="{'path': '/about'}">What we can do</a></dd>
          <dd><a v-link="{'path': '/about'}">What we can offer</a></dd>
          <dd><a v-link="{'path': '/about'}">How to work together</a></dd>
          <dd><a v-link="{'path': '/about'}">How to reach us</a></dd>
        </dl>
        <dl>
          <dt>Knowledge</dt>
          <dd><a v-link="{'path': '/knowledge'}">Methods</a></dd>
          <dd><a v-link="{'path': '/knowledge?position=recommend-reading'}">Recommend Reading</a></dd>
        </dl>
      </div>
    </div>
  </nav>
</template>

<script>
import { util, event } from '../services/index'
const bodyDom = document.body

export default {
  data() {
    return {
        showMenu: false
    };
  },
  ready() {
    event.on('openMenu', this.openMenu)
    event.on('closeMenu', this.closeMenu)
    this.$el.addEventListener(util.transitionEndEvent, this.transitionEnd)
  },
  beforeDestroy(){
    event.off('openMenu', this.openMenu)
    event.off('closeMenu', this.closeMenu)
    this.$el.removeEventListener(util.transitionEndEvent, this.transitionEnd)
  },
  methods: {
    transitionEnd(e){
      if(!this.showMenu){
        this.$el.style.visibility = 'hidden'
      }
    },
    openMenu(){
      window.scrollTo(0,0)
      this.showMenu = true
      this.$el.style.visibility = 'visible'
      bodyDom.classList.add('menu-bg-show')
      setTimeout(()=>{
        bodyDom.classList.add('menu-main-show')
      }, 400)
    },
    closeMenu(){
      window.scrollTo(0,0)
      this.showMenu = false
      bodyDom.classList.remove('menu-main-show')
      setTimeout(()=>{
        bodyDom.classList.remove('menu-bg-show')
      }, 300)
    }
  },
  components: {}
};
</script>

<style lang="stylus">
@import "../stylus/_settings.styl"
.menu
  position absolute
  top 0
  left 0
  bottom 0
  right 0
  color #fff
  visibility hidden
  background #2A2A2A
  z-index 100
  opacity 0
  transition all 400ms cubic-bezier(.65,.33,.44,.89)
  .content
    height 100%
  .menu-header
    opacity 0
    transform translateY(-100%)
    transition all 400ms
  .menu-header-topbar
    height 66px
    width 100%
    position relative
    z-index 10
    margin 0 auto
    .menu-btn
      font-size 40px
      position absolute
      right 0
      top 12px
    .menu-logo
      position absolute
      left 0
      top 10px
      padding-left 55px
      font-weight normal
      height 46px
      font-size 20px
      line-height 46px
      background url(../assets/img/head-logo.png) no-repeat left
      background-size 36px 46px
.menu-content
  height 270px
  position absolute
  top 50%
  left 50%
  margin-top -135px
  opacity 0
  transition all 400ms
  transform translate3d(-50%, 100px, 0)
  width 100%
  display flex
  justify-content space-between
  dt
    font-size 25px
    opacity .7
  dd
    font-size 36px
    margin-top 25px
    margin-left 0
    text-shadow 2px 2px 1px rgba(0,0,0,.08)
    a
      transition color 400ms
      &:hover
        color $pink
</style>
