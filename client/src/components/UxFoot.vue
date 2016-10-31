<template>
  <div class="footer">
    <p class="footer-body">
      CONTACT US! <a href="javascript:;">Let’s chat!</a>
    </p>
    <p class="footer-copyright">
      Copyright @ Studio 8 User Research. All Rights Reserved.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {}
};
</script>

<style lang="stylus">
@import "../stylus/_settings.styl"
.footer
  height 214px
  text-align center
  color #fff
  background-color #2E2E2E
  .footer-body
    font-size 36px
    padding-top 70px
    a
      font-size .7em
      margin-left 8px
      text-decoration underline
      &:hover
        color $pink
  .footer-copyright
    padding-top 55px
    opacity .5
    font-size 12px
</style>
