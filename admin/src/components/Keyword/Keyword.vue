<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="post-list-column">
      <h3 class="page-title"><i class="icon-biaoqian iconfont"></i> Keyword manage <i class="iconfont icon-jiahao post-add" @click="addword"></i></h3>
      <ul class="clearfix reset-list tag-list">
        <li class="keyword addword" v-if="newWord">
          <input type="text" v-model="newWord.name" placeholder="typing keyword">
          <button type="button" class="btn btn-save r" @click="saveWord">save</button>
          <button type="button" class="btn btn-border r" @click="removeWord">delete</button>
        </li>
        <li v-for="word in keywords" @click="searchWord($event, $index)" :class="[{'keyword': editIndex != $index, 'word-edit': editIndex == $index, 'word-active': wordIndex == $index}]">
          <span>{{word['name']}} ({{word['count']}})</span>
          <button type="button" class="btn btn-save r edit-btn" @click="alEdit($index)">rename</button>
          <div class="keyword-edit">
            <input type="text" v-model="word.name" placeholder="typing keyword">
            <button type="button" class="btn btn-save r" @click="saveEditWord">save</button>
            <button type="button" class="btn btn-border r" @click="cancelWord">cancel</button>
          </div>
        </li>
      </ul>
    </section>
    <div class="post-edit">
      <ul class="post-list reset-list">
        <li class="post-list-item" v-for="report in reports">
          <article class="post-thumb">
            <h3 class="post-title"><a href="javascript:;">{{report['title']}}</a></h3>
            <h6 class="post-time">{{format(report['time'])}}</h6>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavAside from '../Common/NavAside.vue'
import service from '../../services/keyword/index'
import report from '../../services/report/index'
import { util } from '../../services/'
export default {
  data() {
    return {
      newWord: null,
      wordIndex: -1,
      editIndex: -1,
      reports: [],
      keywords: [],
      copy: []
    }
  },
  ready() {
    service.getAllKeyWords().then(res => {
      if(res.success){
        this.keywords = res.data
        this.copy = util.copy(this.keywords)
        if(res.data.length > 0){
          this.searchWord({}, 0)
        }
      }
    })
  },
  methods: {
    searchWord(e, index){
      if(this.wordIndex == index || e.target && e.target.nodeName.toLowerCase() == "button"){
        return
      }
      this.wordIndex = index
      this.reports = []
      report.getReportList({query: this.keywords[index].name})
        .then(res => {
          if(res.success){
            this.reports = res.data
          }
        }).catch(err => {
          alert('请求失败！')
        })
    },
    alEdit(index){
      this.editIndex = index
    },
    cancelWord(){
      if(this.editIndex > -1){
        this.keywords[this.editIndex].name = this.copy[this.editIndex].name
        this.editIndex = -1
      }
    },
    saveEditWord(){
      if(this.editIndex > -1){
        let curr = this.keywords[this.editIndex]
        curr.name = curr.name.trim()
        if(this.copy[this.editIndex].name === curr.name){
          alert('并没有任何改动')
          return
        }
        if(curr.name != ""){
          service.updateKeyWords(curr.id, {name: curr.name})
            .then(res => {
              if(res.success){
                this.copy[this.editIndex].name = this.keywords[this.editIndex].name
                this.editIndex = -1
              }else{
                  throw 'error'
              }
            }).catch(err => {
              alert('修改失败！')
            })

        }else{
          alert('输入不合法！')
        }

      }
    },
    addword(){
      if(this.newWord){
        return
      }
      this.newWord = {name: ""}
    },
    removeWord(){
      this.newWord = null
    },
    saveWord(){
      const w = this.newWord.name.trim()
      if(!w){
        return
      }
      for(let k of this.keywords){
        if(k.name == w){
          alert('重复')
          return
        }
      }
      service.createKeyWords({name: w})
        .then(res => {
          if(res.success){
            this.keywords.unshift(res.data)
            this.newWord = null
          }else{
            alert('重复keyword')
          }
        }).catch(err => {
          alert('添加失败！')
        })

    },
    format(d){
      return 'undefined' == typeof d ? "" : util.format(new Date(d), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  components: {
    NavAside
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
    .post-time
      color $light
      margin 0 0 6px
  .addword
    border-bottom 0 none
    padding 0 20px
    input
      width 120px
  .tag-list
    border-top 1px solid $border
    .btn
      padding 3px 8px
      margin-left 8px
  .keyword
    padding 10px 20px
    border-bottom 1px solid $border
    &:hover
      background rgba(0,0,0,.04)
      .edit-btn
        display inline-block
    span
      font-size 13px
      line-height 21px
    .edit-btn
      display none
    .keyword-edit
      display none
  .word-active
    background rgba(0,0,0,.04)
  .word-edit
    padding 10px 20px
    border-bottom 1px solid $border
    &:hover
      background rgba(0,0,0,.04)
    span
      display none
    .edit-btn
      display none
    .keyword-edit
      display block
</style>
