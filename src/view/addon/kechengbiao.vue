<template>
  <div class="hello">
    <form>
      <hr>
      <p>
        <p>碎碎念</p>
        <textarea rows="5" cols="40" v-model="ssnote"></textarea>
      </p>
      </br><hr>
      <p>
        <p>添加主题</p>
        <input type="text" v-model="newtitle" placeholder="enter new list title">
      </p>
      <p><button @click="postnewtitle">添加新主题</button></p>
      </br><hr>
      <p>
        <p>选择主题</p>
        <select v-model="title"> 
          <option v-for="i in data">{{i.title}}</option> 
        </select> 
      </p>
      <p>
        <p>输入新内容</p>
        <input type="text" v-model="msg" placeholder="enter new list item">
      </p>
      <p><button @click="newmsg">添加项目</button></p>
    </form>
    
    <div class="pre">
      <pre>{{ssnote}}</pre>
      <strong>【昨日总结】</strong>
      <div class="border">
        <div v-for="i in data">
          <strong>【{{i.title}}】</strong>
          <ul>
            <li v-for="l in i.list">{{l}}</li>
          </ul>
          <span class="divide"></span>
        </div> 
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'testnote',
  data () {
    return {
      title:'Objective',
      msg:'',
      newtitle:'',
      ssnote:'01:30 - 07:30 ,sleep 4h 43m,deep sleep 0h 57m.\n午休21m+坐享10m(3-5次)',
      data: [
        {
          'title':'Objective',
          'list':[
            'demo'
          ]
        }
      ]
    }
  },
  methods:{
    newmsg(){
      this.data.filter((a)=>{
        return a.title === this.title
      })[0].list.push(this.msg)
    },
    postnewtitle(){
      this.data.push({
        'title':this.newtitle,
        'list':[]
      })
    }
  }
}
</script>

<style lang="less" scoped>
@bordercolor:#ccc;
.pre{
  background:#fff;
  padding:1em;
  width:320px;
  text-align: left;
  margin:0 auto;
  strong{
    font-size:1.5rem;
  }
  .border{
    border:1px solid @bordercolor;
    margin:1rem;
    padding:.5rem;
    strong{
      color:orangered;
    }
    li{
      list-style-type: disc; 
      margin-left:3em;
    }
    .divide{
      height:1px;
      background: @bordercolor;
      width:100%;
      display:block;
    }
  }
}
</style>
