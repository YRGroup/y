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
  }
}
</script>

<style lang="less" scoped>
.home{
  text-align: center;
  .nav{
    // width:100%;
  }
  button{
    margin:1em;
  }
}

</style>
