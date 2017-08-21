<template>
  <div>
  
    <group>
      <x-input title="姓名" v-model="addStudentData.truename" text-align="right" placeholder="请在此填上学生的真实姓名"></x-input>
      <x-input title="学号" v-model="addStudentData.student_id" text-align="right" placeholder="请在此填上学生的学号"></x-input>
      <selector title="关系" :options="parentTypeList" v-model="addStudentData.type"></selector>
    </group>
    <group class="btn" style="margin:0 20px">
      <x-button type="primary" @click.native="addStudent">确定绑定</x-button>
    </group>
  
  </div>
</template>

<script>
import { Group, XButton, XInput, Selector } from 'vux'

export default {
  name: 'addStudent',
  components: {
    Group, XButton, XInput, Selector
  },
  data() {
    return {
      parentTypeList: [
        { key: 1, value: '爸爸' },
        { key: 2, value: '妈妈' },
        { key: 3, value: '爷爷' },
        { key: 4, value: '奶奶' }
      ],
      addStudentData: {
        truename: '',
        student_id: '',
        type: 0,
      },
    }
  },
  methods: {
    addStudent() {
      if (this.addStudentData.truename && this.addStudentData['student_id'] && this.addStudentData.type != 0) {
        this.$API.addStudent(this.addStudentData).then((res) => {
          this.$vux.toast.show({
            type: "text",
            width: "20em",
            text: '绑定成功'
          })
          this.getData()
          this.addStudentPopup = false
        }).catch((err) => {
          this.$vux.toast.show({
            type: "text",
            width: "20em",
            text: err.msg
          })
        })
      } else {
        this.$vux.toast.show({
          type: "text",
          width: "20em",
          text: '请完善数据'
        })
      }
    }
  },
  created() {
    this.$store.commit('changeTitle', '绑定孩子')
    this.getData()
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.btn {
  padding: 10px 20px;
}
</style>
