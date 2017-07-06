<template>
  <div class="notice">

    <div class="addbtn">
      <x-button @click.native="newNotice=true">发布新通知</x-button>
    </div>  

    <popup v-model="newNotice" height="270px" is-transparent>
      <div class="popup">
        <group>
        <x-textarea title="通知内容" placeholder="在此输入通知内容" v-model="newNoticeData.content"></x-textarea>
        </group>
        <div style="padding:20px 15px;">
        <x-button type="primary" @click.native="addNotice">发布</x-button>
        <x-button @click.native="newNotice = false">取消</x-button>
        </div>
      </div>
    </popup>

    <div class="card" v-for="(item,index) in data" :key="index">
      <div class="header">
        <img :src="item.userImg">
        <div class="info">
          <span class="usename">{{ item.auther }}</span>
          <span class="job">【语文】</span>
          <span class="time">{{ item.date }}</span>
        </div>
      </div>
      <div class="content">{{ item.content }}</div>
    </div>

  </div>
</template>

<script>
import { Popup, Group, XTextarea , XButton } from 'vux'

export default {
  name: 'notice',
  components: {
    Popup,
    Group,
    XTextarea ,
    XButton
  },
  data () {
    return {
      newNotice:false,
      newNoticeData:{},
      data:[],
    }
  },
  methods:{
    getData(){
      this.$API.getAllClassDynamic(this.$route.params.classId,3).then(res=>{
        this.data = res
      })
    },
    addNotice(){
      if(this.newNoticeData.content){
        this.newNoticeData.cid = this.$route.params.classId
        this.newNoticeData.type=3
        this.$API.postNewClassDynamic(this.newNoticeData).then(res=>{
          this.$vux.toast.show({
            type:"success",
            text: "发布成功"
          })
          this.newNotice=false
          this.getData()
        })
      }else{
        this.$vux.toast.show({
          type:"warn",
          text: "数据不完整"
        })
      }
    }
  },
  created(){
    this.$store.commit('changeTitle','班级通知')
    this.getData()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.addbtn{
  padding:1rem;
}
.card{
  background: #fff;
  padding:12px;
  .header{
    img{
      height:3.2rem;
      border-radius: 50%;
      vertical-align:top;
      margin-right:0.6rem;
    }
    .info{
      display: inline-block;
      margin-top:5px;
      .usename{
        font-size: 1rem;
      }
      .time{
        display: block;
        color:@cc3;
      }
    }
  }
  .content{
    margin-top:10px;;
  }
}
.popup{
  width: 95%;
  background-color:#fff;
  height:250px;
  margin:0 auto;
  border-radius:5px;
  padding-top:10px;
}
</style>
