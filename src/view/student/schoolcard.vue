<template>
  <div class="hello">
    
    <group title="use slot for complexed content">
      <cell title="slot content">
        <div slot="value">
          <span style="color: green">Hi, I\'m Vux.</span>
        </div>
      </cell>
    </group>

  </div>
</template>

<script>
import { Group,Cell } from 'vux'

export default {
  name: 'hello',
  components: {
    Group,Cell
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
.hello{
  text-align: center;
}
</style>
