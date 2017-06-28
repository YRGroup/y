<template>
  <div class="hello">
  
    <group>
      <x-input title="孩子学号" v-model.trim="addStudentData.student_meid" text-align="right" placeholder="请在此填上孩子学号"></x-input>
      <selector title="关系" :options="parentTypeList" v-model="addStudentData.type"></selector>
    </group>
    <group class="btn" style="margin:0 20px">
      <x-button type="primary" @click.native="addStudent">确定绑定</x-button>
    </group>
  
  </div>
</template>

<script>
import { Group, Cell, XButton, XInput, Popup, Selector } from 'vux'

export default {
  name: 'hello',
  components: {
    Group, Cell, XButton, XInput, Popup, Selector
  },
  data() {
    return {
      addStudentPopup: false,
      parentTypeList: [
        { key: 1, value: '爸爸' },
        { key: 2, value: '妈妈' },
        { key: 3, value: '爷爷' },
        { key: 4, value: '奶奶' }
      ],
      addStudentData: {},
      allStudentData: [],
      noStudent: false,
      data: {}
    }
  },
  methods: {
    getData() {
      this.$API.getCurrentUser().then(res => {
        this.data = res
        if (this.data.ExtendInfo.Students.length == 0) {
          this.noStudent = true
        } else {
          this.noStudent = false
          let num = this.data.ExtendInfo.Students.length
          for (let i = 0; i < num; i++) {
            this.allStudentData.push(res.ExtendInfo.Students[i])
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addStudent() {
      if (this.addStudentData.student_meid && this.addStudentData.type) {
        this.$API.addStudent(this.addStudentData).then((res) => {
          this.$vux.toast.show({
            type: "text",
            width: "20em",
            text: '添加孩子成功'
          })
        }).catch((err) => {
          this.$vux.toast.show({
            type: "text",
            width: "20em",
            text: '添加孩子失败'
          })
        })
        this.$router.push('/user')
      }else{
        this.$vux.toast.show({
            type: "text",
            width: "20em",
            text: '数据不能为空!'
          })
      }
      
    },
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
.user-header {
  text-align: center;
  height: 8em;
  background: linear-gradient(right top, #00c0a1, #00c06f);
  background-size: 100% 100%;
  color: #fff;
  position: relative;
  padding: 1rem;
  img {
    width: 5rem;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.3);
  }
  .btn {
    position: absolute;
    right: 5px;
    top: 50%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    padding: 5px 10px;
  }
}

.btn {
  padding: 10px 20px;
}
</style>
