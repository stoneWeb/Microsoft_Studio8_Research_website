<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="post-list-column">
      <h3 class="page-title"><i class="icon-biaoqian iconfont"></i> User manage <i class="iconfont icon-jiahao post-add" v-if="user.authority == 1" @click="addUser"></i></h3>
      <ul class="clearfix reset-list tag-list">
        <li v-for="u in users" class="user-item" :class="{'user-active': uIndex == $index}" @click="swUser($index)">
          <span>{{u['name']}}</span>
        </li>
      </ul>
    </section>
    <div class="post-edit user-edit" v-if="currUser">
      <h3 v-if="!currUser.newuser">{{currUser.username}}</h3>
      <label class="input-item">
        <span>display name: </span><input type="text" class="form-control only-border-bottom" v-model="currUser.name">
      </label>
      <label class="input-item" v-if="currUser.newuser">
        <span>username: </span><input type="text" class="form-control only-border-bottom" v-model="currUser.username">
      </label>
      <label class="input-item">
        <span>password: </span><input type="text" class="form-control only-border-bottom" v-model="currUser.password">
      </label>
      <div class="user-btn">
        <button type="button" class="btn btn-save" @click="submit">submit</button>
        <button type="button" class="btn btn-border" @click="cancel">cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavAside from '../Common/NavAside.vue'
import service from '../../services/user/index'
import { user } from  '../../vuex/getters/curruser'
import { util } from '../../services/'

export default {
  data() {
    return {
      users: [],
      uIndex: -1,
      currUser: null
    }
  },
  ready() {
    console.log(this.user);
    service.getUsertList()
      .then(res => {
        if(res.success){
          this.users = res.data
        }
      }).catch(err => {
        alert('获取用户失败')
      })
  },
  vuex: {
    getters: {
      user
    }
  },
  methods: {
    addUser(){
      let first = this.users[0]
      if(!first.newuser){
        this.users.unshift({
          name: "请输入名字",
          username: "",
          password: "",
          authority: 3,
          newuser: true
        })
      }else if(this.uIndex == 0){
        return
      }
      this.uIndex = 0
      this.currUser = util.copy(this.users[0])
    },
    swUser(index){
      this.uIndex = index
      this.currUser = util.copy(this.users[index])
    },
    submit(){
      const index = this.uIndex
      const origin = this.users[index]
      let name = this.currUser.name.trim()
      let username = this.currUser.username.trim()
      let password = this.currUser.password || ""
      let fields = {}
      if(name === origin.name
        && password == ""
      ){
        alert('没有改动')
        return
      }
      if(password && password.length < 6){
        alert('密码太短')
        return
      }
      if(!name.length){
        alert('name不合法')
        return
      }
      if(this.currUser.newuser){
        if(!password){
          alert('密码太短')
          return
        }
        if(username.length < 5){
          alert('用户名不合法')
          return
        }
        service.createUser(this.currUser).then(res => {
          if(res.success){
            this.users.splice(index, 1, util.copy(res.data))
            this.uIndex = index
            this.currUser = util.copy(res.data)
            alert('添加用户成功')
          }
        }).catch(err => {
          alert('添加失败')
        })
      }else{
        if(name != origin.name){
          fields['name'] = name
        }
        if(password != ''){
          fields['password'] = password
        }
        service.updateUser(origin._id, fields).then(res => {
          if(res.success){
            this.users[index].name = fields.name
            alert('修改用户成功')
          }
        }).catch(err => {
          alert('修改失败')
        })
      }
    },
    cancel(){
      if(this.currUser.newuser){
        this.users.splice(this.uIndex, 1)
        if(!this.users.length){
          this.currUser = null
          this.uIndex = -1
        }else{
          this.uIndex = 0
          this.currUser = util.copy(this.users[0])
        }
      }
    }
  },
  components: {
    NavAside
  }
};
</script>

<style lang="stylus">
  @import '../../stylus/_settings.styl'
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
  .post-list
    border-top 1px solid $border
  .user-edit
    box-sizing border-box
    padding-top 25px
    h3
      width 400px
      text-align center
  .post-list-item
    cursor pointer
    margin 0 25px
    padding 20px 0
    border-bottom 1px solid $border
  .post-thumb
    padding-left 5px
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
  .user-btn
    width 200px
    display flex
    margin-left 130px
    margin-top 30px
    justify-content space-around
  .tag-list
    border-top 1px solid $border
    .btn
      padding 3px 8px
      margin-left 8px
  .user-item
    padding 10px 20px
    font-size 14px
    border-bottom 1px solid $border
    &:hover
      background rgba(0,0,0,.04)
  .user-active
    background rgba(0,0,0,.04)
</style>
