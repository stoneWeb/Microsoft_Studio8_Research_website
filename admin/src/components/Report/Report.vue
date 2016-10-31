<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="post-list-column">
      <h3 class="page-title"><i class="icon-wenzhang iconfont"></i> Reports list  <i class="iconfont icon-jiahao post-add" @click="addReport"></i></h3>
      <report-list></report-list>
    </section>
    <div class="post-edit">
      <report-edit v-if="currentReportIndex > -1"></report-edit>
    </div>
  </div>
</template>

<script>
  import NavAside from '../Common/NavAside.vue'
  import ReportEdit from '../Common/ReportEdit.vue'
  import ReportList from '../Common/ReportList.vue'
  import service from '../../services/report/index'
  import { getAllReport, createReport, focusOnReport } from '../../vuex/actions/report'
  import { currentReportId, currentReportIndex, reportList } from '../../vuex/getters/report'
  export default{
    data(){
      return {}
    },
    route: {
      data(){
        this.getAllReport()
      }
    },
    components: {
      NavAside,
      ReportList,
      ReportEdit
    },
    vuex: {
      getters: {
        currentReportIndex,
        currentReportId,
        reportList
      },
      actions: {
        getAllReport,
        createReport,
        focusOnReport
      }
    },
    methods: {
      addReport(){
        if(!this.reportList[0] || this.reportList[0] && this.reportList[0].id){
          this.createReport({
            title: "[草稿]新建",
            goal: "",
            methods: "",
            filelink: "",
            researcher: "",
            keywords: [],
            category: 0
          })
        }else if(!this.reportList[0].id){
          this.focusOnReport(0)
        }

      }
    }
  }
</script>

<style lang="stylus">
@import '../../stylus/_settings.styl'
.container-with-aside
  margin-left 70px
  height 100%
.post-list-column
  float left
  border-right 1px solid $border
  height 100%
  width 300px
.post-add
  cursor pointer
  float right
  margin-right 10px
  margin-top 2px
.page-title
  color $light
  padding-left 25px
  font-weight 400
.post-edit
  overflow auto
  height 100%
</style>
