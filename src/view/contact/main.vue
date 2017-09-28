<template>
  <div class="hello" style="margin-top:-10px">

    <has-no-student v-if="$store.state.hasNoStudent">
    </has-no-student>

    <div v-else>
      <group class="link" title="">
        <cell class="itemlist" v-show="$store.state.role=='老师'" :title="'学生 （'+student.length+ ' )'" is-link :border-intent="false" :arrow-direction="showContent1 ? 'up' : 'down'" @click.native="showContent1 = !showContent1" :class="showContent1?'activenav':null">
          <span slot="icon" class="roleheader bgcolor1">
            <i class="iconfont">&#xe607;</i>
          </span>
        </cell>
        <div class="slide" :class="showContent1?'animate':null">
          <cell class="item" is-link v-for="(i,index) in student" :title="i.TrueName " :inline-desc="$store.state.role=='老师'?i.StudentID:null" :link="$store.state.role=='老师'?('/student/'+i.Meid):('/msg/'+i.Meid)" :key="index">
            <img class="cellicon" slot="icon" :src="i.Headimgurl">
          </cell>
        </div>
        <cell class="itemlist" v-show="$store.state.role=='老师'" :title="'家长 （'+parent.length+ ' )'" is-link :border-intent="false" :arrow-direction="showContent2 ? 'up' : 'down'" @click.native="showContent2 = !showContent2" :class="showContent2?'activenav':null">
          <span slot="icon" class="roleheader bgcolor2">
            <i class="iconfont">&#xe609;</i>
          </span>
        </cell>
        <div class="slide" :class="showContent2?'animate':null" >
          <cell class="item" is-link v-for="(i,index) in parent" :link="$store.state.role=='老师'?('/student/'+i.StudentMeid+'/parent'):('/msg/'+i.ParentMeid)" :title="i.ParentTrueName+'（'+i.StudentTrueName+'的'+ i.ParentType+'）'" :inline-desc="$store.state.role=='老师'?i.ParentPhone:null" :key="index">
            <img class="cellicon" slot="icon" :src="i.ParentHeadimgurl">
          </cell>
        </div>
        <cell class="itemlist" :title="'老师 （'+teacher.length+ ' )'" is-link :border-intent="false" :arrow-direction="showContent3 ? 'up' : 'down'" @click.native="showContent3 = !showContent3" :class="showContent3?'activenav':null">
          <span slot="icon" class="roleheader bgcolor3">
            <i class="iconfont">&#xe605;</i>
          </span>
        </cell>
        <div class="slide" :class="showContent3?'animate':null">
          <cell class="item" is-link v-for="(i,index) in teacher" :link="'/teacher/'+i.Meid" :title="i.TrueName + (i.Course?'（' + i.Course + '）':'')" :inline-desc="i.Mobilephone" :key="index">
            <img class="cellicon" slot="icon" :src="i.Headimgurl">
          </cell>
        </div>
      </group>
      <group title="最近消息">
        <ul class="msglist">
          <li @click="$router.push('/msg/'+item.Meid)" v-for="(item,index) in msgdata" :key="index">
            <img :src="item.HeadImg">
            <span class="usename">{{ item.Name }}</span>
            <span class="info">{{ item.Content }}</span>
            <span class="time">{{ item.LastTime }}</span>
            <span class="num" v-show="item.UnReadCount">{{ item.UnReadCount }}</span>
          </li>
        </ul>
        <div class="noMsg" v-if="msgdata.length===0">当前没有消息</div>
      </group>
    </div>
  </div>
</template>

<script>
import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
import hasNoStudent from '@/components/hasNoStudent'

export default {
  name: 'hello',
  components: {
    Group, Cell, CellFormPreview, CellBox, Badge,
    hasNoStudent,
  },
  data() {
    return {
      showContent1: false,
      showContent2: false,
      showContent3: false,
      msgdata: [],
      student: [],
      parent: [],
      teacher: [],
    }
  },
  methods: {
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg
      })
    },
    goAnchor(selector) {
      var anchor = this.$el.querySelector(selector)
      document.body.scrollTop = anchor.offsetTop
    },
    getStudentList() {
      this.$API.getStudentList(this.$store.state.currentClassId).then(res => {
        this.student = res
      })
    },
    getTeacherList() {
      this.$API.getTeacherList(this.$store.state.currentClassId).then(res => {
        this.teacher = res
      })
    },
    getParentList() {
      this.$API.getParentList(this.$store.state.currentClassId).then(res => {
        this.parent = res
      })
    },
    getMsgList() {
      this.$API.getMsgList().then(res => {
        this.msgdata = res
        let data = this.msgdata
        for (var i = 0; i < data.length; i++) {
          let time = new Date(data[i].LastTime)
          data[i].LastTime = time.Format('MM-dd')
        }
      })
    },
    formatterParentType(t) {
      switch (t) {
        case 1:
          return '爸爸'
        case 2:
          return '妈妈'
        case 3:
          return '爷爷'
        case 4:
          return '奶奶'
        case 5:
          return '家长'
      }
    }
  },
  created() {
    this.$store.commit('changeTitle', '班级通讯录')
    this.getStudentList()
    this.getTeacherList()
    this.getParentList()
    this.getMsgList()
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.msglist {
  li {
    padding: 0.8em 0 0 1em;
    background: #fff;
    position: relative;
    img {
      width: 3rem;
      margin-right: 1em;
      border-radius: 50%;
    }
    .usename {
      position: absolute;
      top: 1em;
    }
    .info {
      position: absolute;
      top: 2.7em;
      color: @grey;
      height: 1.5em;
      width: 16em;
      overflow: hidden;
    }
    .time {
      position: absolute;
      top: 1.5em;
      right: 1em;
      color: @grey;
    }
    .num {
      position: absolute;
      top: 3.5em;
      right: 1em;
      background: @main;
      line-height: 1.2em;
      text-align: center;
      width: 1.3em;
      height: 1.3em;
      border-radius: 50%;
      color: #fff;
      font-size: .9em;
    }
  }
  li:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: @border;
    margin-top: .2em;
  }
  li:last-child {
    padding-bottom: 0;
  }
}

// .activenav {
//   background: @main;
//   color: #fff;
// }
.itemlist {
  // background: #f9f9f9;
  margin-top: -1px;
}

.cellicon {
  width: 2.4rem;
  border-radius: 50%;
  margin-right: 1rem;
  margin-left: 1rem;
  vertical-align: middle;
}



.slide {
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  border-top: 1px solid @border;
}

.roleheader {
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  line-height: 2.4rem;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  margin-right: 10px;
  .iconfont {
    font-size: 1.3rem;
  }
}

.bgcolor1 {
  background: #f76a24;
}

.bgcolor2 {
  background: #16c2c2;
}

.bgcolor3 {
  background: #9266f9;
}

.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}

.noMsg {
  text-align: center;
  line-height: 150px;
}
</style>
