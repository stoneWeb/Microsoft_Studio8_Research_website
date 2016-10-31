<template>
  <div class="index-main">
    <div class="content">
      <div class="index-box main-report">
        <h2 class="block-title">
          Reports
        </h2>
        <p>
          AIR User Research conducts research focusing on the Bing, Cortana and Office. We have conducted studies with hundreds of users in the lab or in their real environments.
        </p>
        <p class="more-btn"><a v-link="{'path':'/reports'}">View All Reports</a></p>
        <ul class="quick-btns">
          <li v-link="{'path': '/reports?type=bing'}">
            <div class="list-head bing">
              <i class="icon-bing"></i>
              <span class="icon-doc"></span>
            </div>
            <h3>Bing</h3>
          </li>
          <li v-link="{'path': '/reports?type=cortana'}">
            <div class="list-head cortana">
              <i class="icon-cortana"></i>
              <span class="icon-doc"></span>
            </div>
            <h3>Cortana</h3>
          </li>
          <li v-link="{'path': '/reports?type=bot'}">
            <div class="list-head bot">
              <i class="icon-bot"></i>
              <span class="icon-doc"></span>
            </div>
            <h3>Bot</h3>
          </li>
        </ul>
      </div>

    </div>
    <div class="main-aboutus">
      <div class="about-bg"></div>
      <div class="content">
        <div class="index-box">
          <h2 class="block-title">
            About us
          </h2>
          <p class="more-btn"><a v-link="{'path': '/about'}">View Details</a></p>
          <div class="about-box">
            <dl>
              <dt>What we can do</dt>
              <dd v-link="{'path': '/about?tab=0'}"><span>01</span>Identify the opportunity in planning phase</dd>
              <dd v-link="{'path': '/about?tab=1'}"><span>02</span>Ensure building the right product</dd>
              <dd v-link="{'path': '/about?tab=2'}"><span>03</span>Track success after the product launch</dd>
            </dl>
            <dl>
              <dt>What we can offer</dt>
              <dd v-link="{'path': '/about?position=ux-lab'}"><span>01</span>UX Lab</dd>
              <dd v-link="{'path': '/about?position=user-community'}"><span>02</span>User Community</dd>
            </dl>
            <dl>
              <dt>How to work together</dt>
              <dd v-link="{'path': '/about?position=work-together'}"><span>01</span>Everyone involved in the UX Research</dd>
              <dd v-link="{'path': '/about?position=work-together'}"><span>02</span>Everyone follow up on the research results</dd>
            </dl>
            <dl>
              <dt>How to reach us</dt>
              <dd v-link="{'path': '/about?position=reach-us'}"><br/><p><i class="ion-person"></i>Xiaomeng Yuan</p><p><i class="ion-ios-email"></i>xiyuan@microsoft.com</p></dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div class="index-learn">
      <div class="content">
        <div class="index-box main-learn">
          <h2 class="block-title">
            Learn UX Research
          </h2>
          <p>
            ASG User Research conducts research focusing on the Bing, Cortana and Office. We have conducted studies with hundreds of users in the lab or in their real environments.
          </p>
          <div class="quick-learn">
            <div class="learn-item" v-link="{'path': '/knowledge'}">
              <i class="icon-book"></i>
              <h3>Methods</h3>
              <div class="learn-info">
                8 UX Research Methods and blabla bla
              </div>
            </div>
            <div class="learn-item" v-link="{'path': '/knowledge?position=recommend-reading'}">
              <i class="icon-book"></i>
              <h3>Recommend Reading</h3>
              <div class="learn-info">
                8 UX Research Methods and blabla bla
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ux-foot></ux-foot>
  </div>
</template>

<script>
import UxFoot from './UxFoot.vue'
export default {
  data() {
    return {
    }
  },
  ready() {},
  methods: {},
  components: {
    UxFoot
  }
};
</script>

<style lang="stylus">
@import "../stylus/_settings.styl"
.index-main
  position relative
  background-color #fff
  z-index 10
  .quick-learn
    display flex
    margin-top 40px
    justify-content space-around
    .learn-item
      position relative
      text-align center
      width 270px
      height 140px
      overflow hidden
      cursor pointer
      box-shadow 1px 1px 12px rgba(0,0,0,.1)
      &:hover
        i
          opacity 0
          transform translateY(0)
        h3
          transform translateY(0)
        .learn-info
          bottom 0
      i
        position absolute
        left 50%
        margin-left -20px
        opacity 1
        transform translateY(30px)
        transition all 400ms
      h3
        font-size 16px
        margin-top 30px
        font-weight normal
        transform translateY(60px)
        transition transform 400ms
      .learn-info
        position absolute
        bottom -54px
        width 100%
        background-color $pink
        height 58px
        padding 11px 28px
        color #fff
        transition bottom 400ms
  .index-box
    margin 0 110px
    position relative
  .block-title
    width 205px
    border 8px solid $pink
    padding 40px 25px
    color $pink
    font-size 36px
    position absolute
    left 0
    top -30px
    line-height 1em
  .quick-btns
    display flex
    margin-top 50px
    margin-right 100px
    justify-content space-between
    li
      padding 13px
      cursor pointer
      background-color rgba(0,0,0,0)
      transition all 400ms
      &:hover
        background-color rgba(0,0,0,.01)
        box-shadow 3px 3px 12px rgba(0,0,0,.2)
      .list-head
        height 90px
        width 90px
        display flex
        position relative
        align-items center
        justify-content center
        span
          width 38px
          height 38px
          position absolute
          right -8px
          bottom -8px
          background-color #fff
          border-radius 50%
          box-shadow 1px 1px 2px rgba(0,0,0,.2)
      h3
        font-size 16px
        color #535353
        margin-top 15px
        font-weight normal
      .bing
        background #008272
      .cortana
        background #00BCF2
      .bot
        background #46900D
  .main-report, .main-learn
    font-size 18px
    padding 30px 25px 90px 270px
    p
      line-height 1.8em
    .more-btn
      padding-top 30px
      a
        color $pink
        &:hover
          text-decoration underline
  .main-aboutus
    color #fff
    position relative
    .about-bg
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      background-image url(../assets/img/ab-bg.png)
      background-attachment fixed
      background-position center
      background-repeat repeat-x
      &:after
        content ""
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color rgba(0,0,0,.6)
    .content
      position relative
      z-index 1
      .index-box
        padding-top 90px
        padding-bottom 90px
        .more-btn
          text-align right
    .about-box
      dl
        margin-top 120px
        display flex
        &:first-child
          margin-top 60px
        dt
          position relative
          padding-top 25px
          padding-right 20px
          font-size 26px
          font-weight bold
          width 175px
          margin-right 70px
          &:before
            content ""
            position absolute
            top 0
            left 0
            width 100%
            height 3px
            background-color #fff
        dd
          margin-left 15px
          padding 35px 15px
          padding-top 0
          cursor pointer
          transition background-color 500ms
          width 23%
          font-size 18px
          box-shadow 1px 1px 2px rgba(0,0,0,.3)
          background-color rgba(255,255,255,.2)
          &:hover
            background-color $pink
          i
            font-size 22px
            vertical-align middle
            margin-right 5px
          span
            font-size 26px
            line-height 2em
            display block
</style>
