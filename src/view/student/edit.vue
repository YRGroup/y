<template>
  <div>
    <group>
      <x-input title="姓名" type="text" text-align="right" v-model="truename"></x-input>

      <x-input title="性别" type="text" text-align="right" v-model="sex"></x-input>

      <x-input title="手机" type="text" text-align="right" v-model="parentphone"></x-input>

      <x-input title="民族" type="text" text-align="right" v-model="nation"></x-input>

      <x-input title="地址" type="text" text-align="right" v-model="address"></x-input>
    </group>

    <div class="editbtn">
      <x-button text="保存" type="primary" @click.native="editData"></x-button>
    </div>

  </div>
</template>

<script>
import { Group,Cell,XButton,XInput } from 'vux'

export default {
  components: {
    Group,Cell,XButton,XInput
  },
  data () {
    return {
      truename:null,
      sex:null,
      parentphone:null,
      nation:null,
      address:null
    }
  },
  methods:{
    getData(){
      this.$API.getStudentInfo(this.$route.params.studentId).then(res=>{
        this.truename=res.user.TrueName
        this.sex=res.user.Sex
        this.nation=res.user.Nation
        this.address=res.user.Address
        this.parentphone=res.user.Mobilephone
      }).catch(err=>{
        console.log(err)
      })
    },
    editData(){
      if(this.truename&&this.sex&&this.parentphone&&this.nation&&this.address){
        let data={}
        data.truename=this.truename
        data.sex=this.sex
        data.parentphone=this.parentphone
        data.nation=this.nation
        data.address=this.address
        data.meid=this.$route.params.studentId
        
        this.$API.editStudentInfo(data).then(res=>{
          this.$vux.toast.show({
            type:"success",
            text: '修改成功'
          })
        }).catch(err=>{
          console.log(err)
        })
      }else{
        this.$vux.toast.show({
          type:"warn",
          text: '资料不完整'
        })
      }
      
    }
  },
  created(){
    this.$store.commit('changeTitle','学生资料')
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.editbtn{
  padding:1rem 2rem;
}
</style>
