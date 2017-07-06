<template>
  <div class="hello">

    <q-btn class="primary" rounded @click.native="changeRole('teacher')">切换成教师端</q-btn>
    <q-btn class="primary" rounded @click.native="changeRole('parent')">切换成家长端</q-btn>

    <q-btn class="success" rounded @click.native="$router.push('/class/'+$store.state.classId+'/new')">添加校园动态</q-btn>
    <q-btn class="success" rounded @click.native="$router.push('/class/'+$store.state.classId+'/new')">添加班级动态</q-btn>

    <q-btn class="warning" rounded @click.native="$router.push('/login')">登陆</q-btn>

    <q-btn class="royal" rounded @click.native="$router.push('/regparent')">家长注册</q-btn>
    <q-btn class="royal" rounded @click.native="$router.push('/regteacher')">老师注册</q-btn>
    <q-btn class="royal" rounded @click.native="$router.push('/regstudent')">学生注册</q-btn>

  </div>
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
    this.$store.commit('changeTitle', 'dev index')
  }
}
</script>

<style lang="less" scoped>
.hello {
  text-align: center;
  button {
    margin: 1em;
    width:80%;
  }
}
</style>
