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
      router-link(to="/reader")
        +btn4('添加校园动态')
      router-link(:to="'/class/'+$store.state.classId+'/new'")
        +btn4('添加班级动态')
      div(@click="changeRole('teacher')")
        +btn1('切换成教师端')
      div(@click="changeRole('parent')")
        +btn2('切换成家长端')
  
</template>

<script>
import qBtn from '@/components/q-btn.vue'

export default {
  components: {
    qBtn
  },
  data() {
    return {

    }
  },
  methods: {
    changeRole(val) {
      this.$store.commit('changeRole',val)
      this.$vux.toast.show('切换到' + val)
    }
  },
  created() {
    this.$store.state.isNav = true
  }
}
</script>

<style lang="less" scoped>
.home {
  text-align: center;
  button {
    margin: 1em;
  }
}
</style>
