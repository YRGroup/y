<template lang="pug">
  .home
    br
    p this is pug script.
    br

    mixin btn(name)
      q-btn.primary(rounded)= name
    mixin btn1(name)
      q-btn.success(rounded)= name
    mixin btn2(name)
      q-btn.warning(rounded)= name
    mixin btn3(name)
      q-btn.danger(rounded)= name
    mixin btn4(name)
      q-btn.royal(rounded)= name

    .nav
      router-link(to="/main")
        +btn('学校主页')
      router-link(to="/classmain")
        +btn1('班级主页')
      router-link(to="/msg")
        +btn2('消息主页')
      router-link(to="/user")
        +btn3('我的主页')
      router-link(to="/login")
        +btn4('注册')
      router-link(to="/news")
        +btn('校园动态')
      router-link(to="/class/all")
        +btn1('班级动态')
      router-link(to="/class/kcb")
        +btn2('班级课程表')
      router-link(to="/teacher/张老师")
        +btn3('教师主页')
  
</template>

<script>
import qBtn from '@/components/q-btn.vue'

export default {
  components: {
    qBtn
  },
  data () {
    return {

    }
  },
  methods:{
    test(){
      this.$API.signup('0123')
      // this.$store.commit("logout")
    }
  },
  created(){
    this.$store.state.isNav = true
  }
}
</script>

<style lang="less" scoped>
.home{
  text-align: center;
  button{
    margin:1em;
  }
}

</style>
