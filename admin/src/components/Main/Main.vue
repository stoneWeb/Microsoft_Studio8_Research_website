<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="mainpage">
      <div class="welcome">
        Welcome {{user.name}}
      </div>
    </section>
  </div>
</template>

<script>
import NavAside from '../Common/NavAside.vue'
import { user } from  '../../vuex/getters/curruser'

export default {
  data() {
    return {
    };
  },
  vuex: {
    getters: {
      user
    }
  },
  ready(){
      console.log(this.user);
  },
  methods: {},
  components: {
    NavAside
  }
};
</script>

<style lang="stylus">
@import '../../stylus/_settings.styl'
.container-with-aside
  margin-left 70px
  height 100%
.mainpage
  height 100%
  background #eee
.welcome
  font-size 60px
  text-align center
  padding-top 80px
  font-weight bold
  color #eee
  font-family Georgia
  text-shadow -1px -1px white, 1px 1px #777
</style>
