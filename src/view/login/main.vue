<template>
  <div class="login">

    </br>
    <q-step>    
000
    </q-step>

  </div>
</template>

<script>
import { qStep } from '@/components/q-step.vue'

export default {
  // name: 'login',
  components: {
    "q-step":qStep
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    fun(val){

    }
  },
  created(){

  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.login{
  text-align: center;
  height:85vh;
  background: linear-gradient( top,#ecf0f1,#bdc3c7);
}
</style>
