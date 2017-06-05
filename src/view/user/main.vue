<template>
  <div class="hello">
    
    <div class="user-header">
      <img :src="data.Headimgurl" >
      <p class="usename">{{data.TrueName}}</p>
      <p @click="fun('打开学校主页')">郑州航空港育人国际学校</p>
      <p class="bottomnav">
        <span @click="fun('打开班级主页')">三年级二班</span>
        <span>学号：46565686</span>
      </p>
    </div>

    <group>
      <cell title="我的孩子" value="李晓明" is-link @click.native="fun('打开学生主页')">
        <i slot="icon" class="iconfont">&#xe719;</i>
      </cell>
      <cell title="我的账号" :value="data.Mobilephone" is-link>
        <i slot="icon" class="iconfont">&#xe693;</i>
      </cell>
      <cell title="完善资料"  is-link @click.native="fun('修改资料')">
        <i slot="icon" class="iconfont">&#xe60b;</i>
      </cell>
      <cell title="修改密码"  is-link @click.native="fun('修改密码')">
        <i slot="icon" class="iconfont">&#xe692;</i>
      </cell>
    </group>
    <br>
    <!--<x-button class="btn" @click.native="fun('登出')">退出登陆</x-button>-->
    <div class="exitbtn">
      <a class="btn" @click="fun('登出')">退出登陆</a>
    </div>

  </div>
</template>

<script>
import { Group,Cell,XButton } from 'vux'

export default {
  name: 'hello',
  components: {
    Group,Cell,XButton
  },
  data () {
    return {
      data:{},
      userface: require('@/assets/face/bw.jpg')
    }
  },
  methods:{
    fun(msg){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: msg
      })
    },
    getData(){
      this.$API.getCurrentUser().then(res=>{
        console.log('获取到的用户信息：')
        console.log(res)
        this.data = res
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','个人中心')
    this.getData()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.user-header{
  text-align: center;
  height:16em;
  width:100%;
  background:linear-gradient(right top,#00c0a1, #00c06f);
  background-size:100% 100%;
  color:#fff;
  position: relative;
  padding-top:1rem;
  img{
    width:5rem;
    border-radius:50%;
    border: 4px solid rgba(255,255,255,0.3);
  }
  .usename{
    font-size: 1.2rem;
  }
  .bottomnav{
    position: absolute;
    bottom:0;
    width:100%;
    border-top:1px solid rgba(255, 255, 255, .3);;
    vertical-align: bottom;
    height:2.2rem;
    line-height: 2.2rem;
    font-size: 1.1em;
    span:nth-child(1){
      float:left;
      width:50%;
    }
    span:nth-child(2){
      float:right;
      width:50%;
    }
  }
  .bottomnav:after{
    content: '';
    display:block;
    position: relative;
    width:1px;
    height:2.2rem;
    background:rgba(255, 255, 255, .3);
    top:0;
    left:50%;
  }
}
.exitbtn{
  .btn{
    display: block;
    text-align: center;
    background: #fff;
    padding: 0.5em;
    color: @cc6;
    font-size: 1.4em;
    border-top: 1px solid @cc4;
    border-bottom: 1px solid @cc4;
  }
}
.iconfont{
  color:@c6;
  margin-right:.5em;
}
</style>
