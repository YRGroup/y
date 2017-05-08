<template>
  <div class="hello">
    <card v-for="item in list" :key="item.date">
      <div slot="header" class="header">
        <img :src="item.img" @click="fun('打开 '+item.name+' 的个人页面')">
        <span>{{ item.name }}</span>
        <span>{{ item.date }}</span>
        <span>{{ item.class }}</span>
      </div> 
      <div slot="content" class="content">
        <p>{{ item.content }}</p>
      </div>
      <div slot="footer" class="footer">
        <div class="footer-btn">
          <i class="fa fa-eye"> {{ item.read }}</i>
          <i class="fa fa-thumbs-up" @click="fun('给 '+item.name+' 点赞成功')"> {{ item.liked }}</i>
        </div>  
        <div class="comment">
          <li v-for="comment in item.comment" :key="comment.name">
            <span @click="fun('打开 '+comment.name+' 的个人页面')">{{ comment.name }}：</span>
            <span>{{ comment.content }}</span>
          </li>
          <div @click="$router.push('/class/msg')">
            查看更多
          </div>
        </div>
      </div> 
    </card>
  </div>
</template>

<script>
import { Card } from 'vux'

export default {
  components: {
    Card
  },
  data () {
    return {
      list:[
        {
          'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
          'name':'李老师',
          'date':'2017-4-25',
          'class':'文章',
          'content':'『育人朗读者』是由育人教育集团宣传部推出，每周为大家推选出一本书，并择选出书中的优秀章节，由朗读者为大家领读。。。',
          'read':'40',
          'liked':'3',
          'comment':[
            {
              'name':'李大明的家长',
              'content':'祝育人教育集团越来越好！'
            },
            {
              'name':'小李',
              'content':'这一期，我们大家带来的这是来自法《人间喜剧》。'
            }
          ]
        },
        {
          'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
          'name':'李老师',
          'date':'2017-4-25',
          'class':'文章',
          'content':'『育人朗读者』是由育人教育集团宣传部推出，每周为大家推选出一本书，并择选出书中的优秀章节，由朗读者为大家领读。。。',
          'read':'40',
          'liked':'3',
          'comment':[
            {
              'name':'李大明的家长',
              'content':'祝育人教育集团越来越好！'
            },
            {
              'name':'小李',
              'content':'这一期，我们大家带来的这是来自法《人间喜剧》。'
            }
          ]
        }
      ]
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
  
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>

</style>
