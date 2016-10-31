<template>
  <div class="wrapper ux">
    <router-view>
    </router-view>
  </div>
  <Menu></Menu>
</template>

<script>
import Menu from 'components/Menu.vue'
export default {
  data() {
    return {
    }
  },
  components: {
    Menu
  },
  ready() {},
  methods: {}
};
</script>

<style lang="stylus">
.menu-bg-show
  .menu
    opacity 1
.menu-main-show
  height 100%
  overflow hidden
  .menu
    .menu-content
      transform translate(-50%, 0)
      opacity 1
    .menu-header
      transform translateY(0)
      opacity 1
</style>
