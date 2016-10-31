<template lang="html">
  <div style="height:100%">
    <router-view
      transition="fade"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
import store from './vuex/store'
import { deleteToken } from './vuex/actions/token'
export default {
  store,
  vuex: {
    actions: {
      deleteToken
    }
  }
};
</script>

<style lang="stylus">
.fade-transition
  transition: opacity .15s ease
.fade-enter, .fade-leave
  opacity: .3
.msgbox
  width 40%
</style>
