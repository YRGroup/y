<template>
  <div class="step1">

    </br>
    <x-button type="primary" @click.native="next">登陆</x-button>

    <x-button type="warn" @click.native="next">注册</x-button>

  </div>
</template>

<script>
import { XButton } from 'vux'

export default {
  components: {
    XButton
  },
  data () {
    return {

    }
  },
  methods:{
    fun(msg){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: msg
      })
    }
  },
  created(){
    this.$store.state.title = '注册/登陆'
    this.$store.state.isNav = false
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>

</style>
