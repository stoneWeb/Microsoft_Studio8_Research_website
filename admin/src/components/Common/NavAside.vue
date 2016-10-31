<template>
  <aside class="sidebar">
    <img class="sidebar-logo" src="../../assets/img/logo_text.png" alt="logo">
    <nav class="aside-nav">
      <ul class="aside-nav-list">
        <li class="aside-nav-item"><a class="aside-nav-button" v-link="{ path: '/report', activeClass: 'active' }"><i class="icon-wenzhang iconfont"></i></a>  </li>
        <li class="aside-nav-item"><a class="aside-nav-button" v-link="{ path: '/keyword', activeClass: 'active' }"><i class="icon-biaoqian iconfont"></i></a> </li>
        <li class="aside-nav-item"><a class="aside-nav-button" v-link="{ path: '/user', activeClass: 'active' }"><i class="icon-wo iconfont"></i></a> </li>
      </ul>
    </nav>
    <nav class="aside-menu">
      <ul class="aside-nav-list">
        <!--<li class="aside-nav-item"><a class="aside-nav-button"><i class="icon-ordinaryset iconfont"></i></a></li>-->
        <li class="aside-nav-item"><a class="aside-nav-button" @click="deleteToken()"><i class="icon-icon11 iconfont"></i> </a></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { deleteToken } from '../../vuex/actions/token'
import { curruser } from '../../vuex/getters/curruser'

export default {
  vuex: {
    actions: {
      deleteToken
    },
    getters: {
      curruser
    }
  },
  ready(){
    //console.log(this.curruser);
  }
};
</script>

<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .sidebar
    box-sizing border-box
    border-right 1px solid $border
    background-color #444
    text-align center
    color white
    position fixed
    height 100%
    width 70px
    padding 12px 12px 24px 12px
    left 0
    top 0
    .aside-nav
      margin-top 30px
  .sidebar-logo
    margin-top 5px
    width 36px
  .aside-nav
    border-top 1px solid #555
  .aside-nav-list
    list-style none
    padding 0
  .aside-nav-item
    padding 20px 0
  .aside-nav-button
    cursor pointer
    display inline-block
    box-sizing border-box
    width 45px
    height 45px
    padding 0
    padding-top 10px
    transition all 800ms
    border 1px solid rgba(0,0,0,0)
    border-radius 50%
    color $green
    &.active
      border 1px solid $green
    &:hover
      color white
      background $green
      border 1px solid $green
    .iconfont
      font-size 22px
  .aside-menu
    position absolute
    width 100%
    left 0
    bottom 0
</style>
