<template>
  <ul class="post-list reset-list">
    <li class="post-list-item" v-for="report in reportList" @click="focus($index)">
      <article class="post-thumb" :class="[{'active':$index === currentReportIndex}]">
        <h3 class="post-title"><a href="javascript:;">{{report['title']}}</a></h3>
        <h6 class="post-time">{{format(report['time'])}}</h6>
      </article>
    </li>
  </ul>
</template>

<script>
import { focusOnReport } from '../../vuex/actions/report'
import { util } from '../../services/'
import { currentReportId, currentReportIndex, reportList } from '../../vuex/getters/report'
export default {
  vuex: {
    getters: {
      currentReportId,
      currentReportIndex,
      reportList
    },
    actions: {
      focusOnReport
    }
  },
  methods: {
    focus(index){
      if(index !== this.currentReportIndex){
        this.focusOnReport(index)
      }
    },
    format(d){
      return 'undefined' == typeof d ? "" : util.format(new Date(d), 'yyyy-MM-dd hh:mm:ss')
    }
  }
};
</script>

<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .post-list
    border-top 1px solid $border
  .post-list-item
    cursor pointer
    margin 0 25px
    padding 20px 0
    border-bottom 1px solid $border
  .post-thumb.active
    border-left 2px solid $green
  .post-thumb
    padding-left 5px
    &.published
      border-left 2px solid $green
    &.updated
      border-left 2px solid $yellow
    .post-title
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      font-size 16px
      line-height 1.3
      font-weight 400
      margin 0 0 4px
      padding-bottom 0
    &.active
      .post-title
        color $green
    &:hover
      .post-title
        color $green
    .post-content
      color $light
      font-size 12px
      font-weight 400
      line-height 17px
      margin 0
      max-height ( 3 * @line-height )
      overflow hidden
      word-wrap break-word
    .post-time
      color $light
      margin 0 0 6px
  .post-thumb-content
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>
