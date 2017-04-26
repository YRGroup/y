<template lang="pug">
  .home
    br
    p this is pug script.
    br

    mixin btn(name)
      q-btn.primary(rounded)= name
    mixin btn1(name)
      q-btn.success(rounded)= name

    .nav
      router-link(to="/main")
        +btn('我cat')
      router-link(to="/main")
        +btn('主页11111111')
      router-link(to="/main")
        +btn1('主页')
      router-link(to="/main")
        +btn('ss')
      router-link(to="/main")
        +btn1('主页')
      router-link(to="/main")
        +btn('主页222222')
      router-link(to="/main")
        +btn1('主页')
      router-link(to="/main")
        +btn('主页')
      router-link(to="/main")
        +btn('主页')
      router-link(to="/main")
        +btn('主页')
      router-link(to="/main")
        +btn1('主页')
      router-link(to="/main")
        +btn('主页')
      router-link(to="/main")
        +btn('主页')
  
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
