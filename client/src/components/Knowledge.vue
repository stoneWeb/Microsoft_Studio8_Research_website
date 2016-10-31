<template>
  <div class="know-page">
    <div class="header-topbar pink">
      <div class="content">
        <a v-link="{'path':'/index'}" title="UX Research" class="logo">Knowledge</a>
        <a href="javascript:;" title="Menu" class="menu-btn" @click="openMenu">Menu <i class="ion-android-menu"></i></a>
      </div>
    </div>
    <div class="content">
      <div class="know-wrap">
        <h2>UX Research Methods</h2>
        <div class="know-method">
          <ul class="methods9">
            <li class="m1"><a target="_blank" href="https://www.youtube.com/watch?v=BrVnBdW6_rE">Usability Studies</a></li>
            <li class="m2"><a target="_blank" href="https://www.youtube.com/watch?v=gQgwNfu7UMI">Focus Group</a></li>
            <li class="m3"><a target="_blank" href="https://www.youtube.com/watch?v=PmioMessMbY">Card Sort</a></li>
            <li class="m4"><a target="_blank" href="https://www.youtube.com/watch?v=bi2JMRpL9Ik">Survey</a></li>
            <li class="m5"><a target="_blank" href="https://www.youtube.com/watch?v=gox5X3_b4SM">Ethnographic Studies</a></li>
            <li class="m6"><a target="_blank" href="https://www.youtube.com/watch?v=lo_a2cfBUGc">Eye Tracking Studies</a></li>
            <li class="m7"><a target="_blank" href="https://www.youtube.com/watch?v=JC9B0gIhcrQ">Paper Prototype Studies </a></li>
            <li class="m8"><a target="_blank" href="https://www.youtube.com/watch?v=0awvMAcON-w">Diary Studies</a></li>
            <li class="m9"><a target="_blank" href="https://www.youtube.com/watch?v=KvmbXt0HJ6w">In-depth Interview</a></li>
          </ul>
        </div>
        <h3 class="title1">A LANDSCAPE OF USER RESEARCH METHODS</h3>
        <div class="methods-map">
          <img src="../assets/img/map.png" alt="" />
        </div>
      </div>
    </div>
    <div class="know-read" id="recommend-reading">
      <div class="content">
        <h2>Recommend Reading</h2>
        <h3 class="title2">Key Articles and Blogs</h3>
        <div class="read-box">
          <a href="javascript:;">
            <img src="../assets/img/g1.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/g2.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/g3.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/g4.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/g5.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/g6.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/g7.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/g8.png" alt="" />
          </a>
        </div>
        <h3 class="title2">Books</h3>
        <div class="read-box">
          <a href="javascript:;">
            <img src="../assets/img/b1.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/b2.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/b3.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/b4.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/b5.png" alt="" />
          </a>
        </div>
        <h3 class="title2">Associations</h3>
        <div class="read-box">
          <a href="javascript:;">
            <img src="../assets/img/a1.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/a2.png" alt="" />
          </a>
          <a href="javascript:;">
            <img src="../assets/img/a3.png" alt="" />
          </a>
        </div>
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
    }
  },
  ready() {
    if(this.$route.query.position){
      this.$nextTick(function(){
        util.scrollTop(this.$route.query.position)
      })
    }
  },
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
.know-page
  background-color #F5F5F5
.pink
  box-shadow 0 2px 20px rgba(0,0,0,.2)
.know-wrap
  padding 70px
  color #535353
  h2
    font-size 36px
    text-align center
  .methods9
    width 810px
    margin 40px auto
    display flex
    flex-wrap wrap
    align-content center
    align-items center
    li
      position relative
      width 260px
      height 180px
      border-radius 2px
      overflow hidden
      margin 10px 5px 0 5px
      background-size cover
      transition all 400ms
      transform scale(1)
      text-align center
      box-shadow 1px 1px 10px rgba(0,0,0,.2)
      a
        display block
        font-size 20px
        color #fff
        background-color rgba(0,0,0,.6)
        transition background-color 400ms
        line-height 180px
      &:hover
        z-index 1
        transform scale(1.2)
        box-shadow 2px 2px 5px rgba(0,0,0,.3)
        a
          background-color rgba(0,0,0,.8)
    .m1
      background-image url(../assets/img/m1.png)
    .m2
      background-image url(../assets/img/m2.png)
    .m3
      background-image url(../assets/img/m3.png)
    .m4
      background-image url(../assets/img/m4.png)
    .m5
      background-image url(../assets/img/m5.png)
    .m6
      background-image url(../assets/img/m6.png)
    .m7
      background-image url(../assets/img/m7.png)
    .m8
      background-image url(../assets/img/m8.png)
    .m9
      background-image url(../assets/img/m9.png)
  .methods-map
    width 792px
    margin 0 auto
  .title1
    font-size 24px
    text-align center
    line-height 4em
.know-read
  background-color #303236
  padding 40px 0
  color #fff
  h2
    text-align center
    font-size 36px
  .title2
    font-size 20px
    text-align center
    opacity .8
    margin 30px 0
  .read-box
    display flex
    width 825px
    margin 0 auto
    flex-wrap wrap
    align-content center
    align-items center
    a
      display flex
      width 254px
      padding 10px
      align-content center
      align-items center
      justify-content center
      transition background-color 500ms
      &:hover
        background-color rgba(0,0,0,.2)
      img
        display block
</style>
