<template>
  <div>
    <group>
      <cell title="姓名" :value="data.user.TrueName"></cell>
      <cell title="所在学校" :value="data.School.Name"></cell>
      <cell title="所在班级" :value="data.Class.Name"></cell> 
    </group>
    <group title="家长">     
      <cell :title="i.ParentType" :inline-desc="i.ParentTrueName" 
      :value="i.ParentPhone" v-for="i in data.Parents"
      :key="i.ParentPhone"
      ></cell>
    </group>
    <group title="基本资料"> 
      <cell title="性别" :value="data.user.Sex"></cell>
      <cell title="手机" :value="data.user.Mobilephone"></cell>
      <cell title="民族" :value="data.user.Nation"></cell>
      <cell title="简介" :value="data.user.SelfDiscription"></cell>
      <cell title="地址" :value="data.user.Address"></cell>
    </group>

    <div class="editbtn">
      <x-button text="修改资料" type="primary" 
      @click.native="$router.push('/student/'+$route.params.studentId+'/edit')"
      ></x-button>
    </div>

  </div>
</template>

<script>
import { Group,Cell,XButton  } from 'vux'

export default {
  components: {
    Group,Cell,XButton
  },
  data () {
    return {
      data: {}
    }
  },
  methods:{
    getData(){
      this.$API.getStudentInfo(this.$route.params.studentId).then(res=>{
        this.data=res
      })
    }
  },
  created(){
    this.$store.commit('changeTitle','学生资料')
    this.getData()
    this.$store.commit('showstuHeader',false)
  }
}
</script>

<style lang="less" scoped>
.editbtn{
  padding:1rem 2rem;
}
</style>
