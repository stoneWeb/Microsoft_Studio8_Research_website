<template>
  <section v-if="data">
    <div>
      <input type="text" class="form-control big only-border-bottom" v-model="data.title">
    </div>
    <div class="clearfix">
      <div class="half-container">
        <i class="icon-biaoqian iconfont" style="margin-right:5px"></i>
        <span class="tag" v-for="keyword in data.keywords">{{keyword['name']}} <i class="icon-chacha iconfont delete-tag" @click="deleteKeyword(keyword, $index)"></i></span>
        <div class="tag active">
          <span v-show="!wordInput" class="addtag" @click="addKeyword()" >+</span> <input type="text" class="tag-input" v-show="wordInput" v-model="wordNew" placeholder="使用回车键提交" @keyup.13="submitNewWord">
          <ul class="search-list reset-list" v-if="wordInput" v-show="wordsToAdd.length">
            <li class="search-item" @click="submitWord(k)" v-for="k in wordsToAdd">{{k['name']}}</li>
          </ul>
        </div>
      </div>
      <div class="half-container">
        <button type="button" class="btn btn-save r" @click="publish">save report</button>
        <button type="button" class="btn btn-border r" @click="removeReport">delete report</button>
      </div>
    </div>
    <label class="input-item">
      <span>Report type: </span>
      <select class="" v-model="data.category">
        <option v-for="type in categorys" value="{{$index}}">{{type}}</option>
      </select>
    </label>
    <label class="input-item">
      <span>Research goal: </span><input type="text" class="form-control only-border-bottom" v-model="data.goal">
    </label>
    <label class="input-item">
      <span>Methods: </span><input type="text" class="form-control only-border-bottom" v-model="data.methods">
    </label>
    <label class="input-item">
      <span>PPT link: </span><input type="text" class="form-control only-border-bottom" v-model="data.filelink">
    </label>
    <label class="input-item">
      <span>Researcher: </span><input type="text" class="form-control only-border-bottom" v-model="data.researcher">
    </label>
  </section>
</template>

<script>
import service from '../../services/report/index'
import { util } from '../../services/'
import { currentReportId, currentReportIndex, reportList } from '../../vuex/getters/report'
import { saveReport, updateReport, deleteReport } from '../../vuex/actions/report'

export default {
  data(){
    return {
      categorys: _config.reportsType,
      keywords: [],
      wordsToAdd: [],
      wordNew: '',
      wordInput: false,
      sending: false,
      data: {}
    }
  },
  ready(){
    this.data = util.copy(this.reportList[this.currentReportIndex])
  },
  vuex: {
    getters: {
      currentReportId,
      currentReportIndex,
      reportList
    },
    actions: {
      saveReport,
      updateReport,
      deleteReport
    }
  },
  watch: {
    reportList(val){
      this.data = util.copy(this.reportList[this.currentReportIndex])
    },
    currentReportIndex(val){
      if(-1 != val){
        this.data = util.copy(this.reportList[val])
      }else{
        this.data = null
      }
    }
  },
  methods: {
    publish(){
      if(this.sending)return
      let id = this.data.id
      let checkData = () => {
        const fields = ['title', 'goal', 'methods', 'filelink', 'researcher']
        let o = {},
            originData = this.reportList[this.currentReportIndex],
            diff
        for(let k of fields){
          let d = this.data[k].trim()
          if(id){// update
            if(''+d != ''+originData[k]){
              o[k] = d
              diff = true
            }
          }else{
            o[k] = d
          }
          if(!d){
            return {success: false, msg: '请填写完整'}
          }

        }
        if(!id){
          o.category = this.data.category || 0
          o.keywords = this.data.keywords.slice().map(item => item.id)
          return {success: true, data: o}
        }else{
          if(this.data.category !== originData.category){
            diff = true
            o.category = this.data.category || 0
          }
          if(''+this.data.keywords !== ''+originData.keywords){
            diff = true
            o.keywords = this.data.keywords.slice().map(item => item.id)
          }
          o.id = originData.id
          if(diff){
            return {success: true, data: o}
          }else{
            return {success: false, msg: '没有任何改动'}
          }
        }
      }
      const check = checkData()
      if(!check.success){
        alert(check.msg)
        return
      }
      this.sending = true
      this[id?"updateReport":"saveReport"](check.data).then(res => {
        this.data = res.data
        alert('Success!')
        this.sending = false
      }).catch(err => {
        alert('发布失败！')
        this.sending = false
      })
    },
    removeReport(){
      if(this.sending)return
      if(!this.data.id){
        this.deleteReport()
        return
      }
      confirm("确定要删除？", "系统提示").then(res => {
        this.deleteReport().then(() => {
          alert('删除成功')
          this.sending = false
        }).catch(err => {
          alert('删除失败')
          this.sending = false
        })
      }).catch(() => {})
    },
    addKeyword(){
      this.wordInput = true
      this.wordNew = ''
      this.searchWords()
    },
    deleteKeyword(keyword, index){
      if(index > -1){
        this.data.keywords.splice(index, 1)
      }
    },
    submitWord(keyword){
      this.wordInput = false
      this.wordNew = ''
      for(let k of this.data.keywords){
        if(k.id === keyword.id){
          return
        }
      }
      this.data.keywords.push(keyword)
    },
    submitNewWord(){
      this.wordInput = false
      let word = this.wordNew.trim()
      this.wordNew = ''
      if(word){
        for(let k of this.wordsToAdd){
          if(k.name === word){
            this.submitWord(k)
            return
          }
        }
        //没有这个词的话添加。。。
        service.createKeyWords({name: word}).then(res => {
          if(res.success){
            this.wordsToAdd.unshift(res.data)
            this.data.keywords.push(res.data)
          }else{
            alert('标签创建失败')
          }
        }).catch(() => {
          alert('标签创建失败')
        })
      }
    },
    searchWords(val){
      service.getAllKeyWords().then(res => {
        if(res.success){
          this.wordsToAdd = res.data
        }
      })
    }
  }
};
</script>

<style lang="stylus">
@import '../../stylus/_settings.styl'
.title-active
  .big
    border 1px solid $yellow
.big
  transition border 0.5s
  padding 13px 20px 13px 30px
  font-size 26px
.input-item
  display flex
  align-items center
  width 400px
  margin-left 15px
  margin-bottom 10px
  span
    width 120px
    font-size 13px
    text-align right
    margin-right 10px
  input
    flex 1
    font-size 13px
.only-border-bottom
  border 1px solid transparent
  border-bottom 1px solid $border
.half-container
  float left
  box-sizing border-box
  width 50%
  padding 15px
  .btn+.btn
    margin-right 20px
.tag
  position relative
  display inline-block
  padding 3px 0
  font-size 14px
  color $light
  border-bottom 2px solid $light
  margin-top 5px
  margin-right 20px
  .iconfont
    display none
  &:hover
    color $green
    border-bottom 2px solid $green
    .iconfont
      display inline
  &.active
    color $green
    border-bottom 2px solid $green
    position relative
  .addtag
    padding 0 5px
    cursor pointer
.search-list
  position absolute
  top 25px
  left -6px
  z-index 100
  width 100%
  padding 5px
  cursor pointer
  background white
  border: 1px solid $border
  border-radius 4px
  box-shadow 0 6px 12px rgba(0,0,0,.03)
.search-item
  color $light
  padding-left 4px
  &:hover
    color  $green
  &+&
    padding-top 10px
.delete-tag
  display none
  position absolute
  right -8px
  top -3px
  font-size 12px
.tag-input
  border none
  background transparent
  color $green
  font-size 14px
  outline 0
</style>
