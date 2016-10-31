<template>
  <div class="about-view">
    <header class="about-head">
      <div class="head-top">
        <div class="ab-head-bg"></div>
        <div class="content">
          <div class="header-topbar">
            <a v-link="{'path':'/index'}" title="UX Research" class="logo">About Us</a>
            <a href="javascript:;" title="Menu" class="menu-btn" @click="openMenu">Menu <i class="ion-android-menu"></i></a>
          </div>
          <h1>WHAT WE CAN DO</h1>
          <div class="ab-head-tab">
            <div :class="{'active': tab == 0}">
              <a href="javascript:;" @click="tab=0">
                <h4>Identify the opportunity in planning phase</h4>
              </a>
            </div>
            <div :class="{'active': tab == 1}">
              <a href="javascript:;" @click="tab=1">
                <h4>Ensure building the right product</h4>
              </a>
            </div>
            <div :class="{'active': tab == 2}">
              <a href="javascript:;" @click="tab=2">
                <h4>Track success after the product launch</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="head-bottom">
        <div class="content">
          <div class="head-item" v-show="tab == 0" transition="tabitem">
            Identify the opportunity in planning phase
          </div>
          <div class="head-item" v-show="tab == 1" transition="tabitem">
            Identify the opportunity in planning phase fsdgdgdsa
          </div>
          <div class="head-item" v-show="tab == 2" transition="tabitem">
            Identify the opportunity in
          </div>
          <div class="head-all">
            <p>
              What to build and who to build it for? <br/>What’s the customer value?
            </p>
            <ul>
              <li>Market Opportunity Analysis </li>
              <li>Audience Segmentation & Targeting </li>
              <li>Habits & Practices </li>
              <li>Scenario Prioritization</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <div class="about-main" id="user-community">
      <h1>WHAT WE HAVE</h1>
      <h2>User Community</h2>
      <p>
        We recruited potential fans from the existing channels. To join the user community, each person needs to complete a lengthy survey.
      </p>
      <div class="img-center">
        <img src="../assets/img/about1.png" width="730" alt="" />
        <br/><br/><br/>
        <img src="../assets/img/about2.png" width="920" alt="" />
        <br/>
      </div>
      <h2 id="ux-lab">UX Lab</h2>
      <p>
        We have a specialized lab to use for user research. Online streaming is supported in this lab.
      </p>
      <div class="img-center">
        <img src="../assets/img/about3.png" width="920" alt="" />
      </div>
      <div class="about-main-btm" id="work-together">
        <h1>HOW TO WORK TOGETHER</h1>
        <br/><br/><br/>
        <div class="img-center">
          <img src="../assets/img/about4.png" width="920" alt="" />
        </div>
      </div>
      <h1 id="reach-us">HOW TO REACH US</h1>
      <p>
        If you have any questions regarding use research, you can contact ASG user researcher.
      </p>
      <div class="about-contact">
        <div><i class="ion-person"></i>Xiaomeng Yuan</div><div><a href="mailto:xiyuan@microsoft.com"><i class="ion-ios-email"></i>xiyuan@microsoft.com</a></div>
      </div>
    </div>
    <ux-foot></ux-foot>
  </div>
</template>

<script>
import { util, event } from '../services/index'
import UxFoot from './UxFoot.vue'
export default {
  data() {
    return {
        tab: 0
    }
  },
  computed: {},
  ready() {
    if (this.$route.query.tab*1==this.$route.query.tab) {
      this.tab = this.$route.query.tab
    }
    if(this.$route.query.position){
      this.$nextTick(function(){
        util.scrollTop(this.$route.query.position)
      })
    }
  },
  attached() {},
  methods: {
    openMenu(){
      util.openMenu()
    }
  },
  components: {
    UxFoot
  }
};
</script>

<style lang="stylus">
@import "../stylus/_settings.styl"
.tabitem-transition
  transition all 600ms
  transform translateY(0) scale(1)
  opacity 1
.tabitem-enter,.tabitem-leave
  transform translateY(50px) scale(.8)
  opacity 0
.about-main-btm
  color #fff
  margin-top 100px
  background-color #303236
.about-main
  color #4a4a4a
  .about-contact
    padding-bottom 100px
    div
      font-size 22px
      width 300px
      margin 0 auto
      padding 8px 0
      i
        margin-right 10px
  p
    font-size 16px
    width 500px
    margin 0 auto
    padding 35px 0 50px 0
    text-align center
  .img-center
    img
      display block
      margin 0 auto
.about-view
  background-color #f5f5f5
  h1
    position relative
    font-size 38px
    text-align center
    padding-top 50px
    padding-bottom 25px
    &:after
      content ""
      height 0
      width 140px
      position absolute
      bottom 0
      left 50%
      margin-left -70px
      border-bottom 3px solid $pink
  h2
    font-size 24px
    text-align center
    margin-top 60px

.about-head
  height 785px
  color #fff
  .head-bottom
    height 310px
    background-color $pink
    position relative
    z-index 1
    .content
      position relative
      height 100%
      .head-item
        position absolute
        width 330px
        top 75px
        font-size 26px
        left 20%
        font-weight bold
      .head-all
        position absolute
        width 290px
        top 60px
        font-size 18px
        right 20%
        li
          padding 5px 0
          &:before
            content ""
            width 5px
            height 5px
            margin-right 8px
            display inline-block
            border-radius 50%
            background-color #fff
            vertical-align middle
  .head-top
    height 475px
    position relative
    .content
      position relative
      height 100%
      z-index 3
      .ab-head-tab
        width 100%
        position absolute
        bottom 0
        height 250px
        display flex
        font-size 18px
        div
          flex 1
          position relative
          padding-top 30px
          a
            padding-top 90px
            display block
            margin 0 auto
            width 120px
        .active
          &:after
            position absolute
            bottom 0
            content ""
            left 50%
            margin-left -12px
            border-width 12px
            border-style solid
            border-color transparent transparent $pink transparent

    .ab-head-bg
      position absolute
      left 0
      top 0
      right 0
      bottom 0
      &:before
        content ""
        filter blur(15px)
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background url(../assets/img/about-bg.png) no-repeat center
        background-size cover
      &:after
        z-index 1
        content ""
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color rgba(0,0,0,.7)
</style>
