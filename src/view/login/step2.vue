<template>
  <div>
    <flexbox-item :span="12">
      <input class="wid" placeholder="请输入学生的学号" v-model="value1"></input>
    </flexbox-item>
    </br>
    <flexbox-item :span="12">
      <input class="wid" placeholder="请输入学生的密码" v-model="value2"></input>
    </flexbox-item>
    </br>
    <flexbox-item :span="12">
      <input class="wid" placeholder="请输入学生的姓名" v-model="value3" @keyup.native.enter="next"></input>
    </flexbox-item>
    </br>
    <x-button type="primary" @click.native="next">下一步</x-button>
  </div>
</template>

<script>
import API from '@/server/API'
import { XButton,Flexbox,FlexboxItem  } from 'vux'

export default {
  components: {
    XButton,Flexbox,FlexboxItem
  },
  data () {
    return {
      value1:'',
      value2:'',
      value3:'',
      student:{
        'xuehao':'',
        'pw':'',
        'name':''
      }
    }
  },
  methods:{
    next(){
      if(this.value1&&this.value2&&this.value3){
        this.student.xuehao = this.value1
        this.student.pw = this.value2
        this.student.name = this.value3
        API.addstudent(this.student).then(res=>{
          console.log(res)
          this.$vux.toast.show({
            type:"text",
            width:"20em",
            text: '添加学生信息成功'
          })
          this.$store.state.reginfo.child = []
          this.$store.state.reginfo.child.push(this.value1)
          this.$router.push('/reg/step3')
          this.$parent.stepnum = 3
        }).catch(error=>{
          this.$vux.toast.show({
            type:"text",
            width:"20em",
            text: error
          })
        })
      }else{
        alert('数据不完整')
      }
      
    }
  },
  created(){
    if(this.$store.state.reginfo.tel){
      console.log(this.$store.state.reginfo)
    }else{
      this.$router.push('/reg/step1')
    }
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
input{
  border-radius:5px;
  border:none;
  padding:1em;
}
.wid{
  width:90%;
}
</style>
