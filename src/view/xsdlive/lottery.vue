<template>
  <div class="wrapper">
    <div class="item">
      <ul class="userlist">
        <li v-for="item in userlist" class="user">
          <img :src="item.img" alt="">
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  name: 'lottery',
  data() {
    return {
      userlist:[
        {
          img: require('@/assets/face/jay.jpg'),
          name: "周杰伦1"
        },
        {
          img: require('@/assets/face/jobs.jpg'),
          name: "周杰伦2"
        },
        {
          img: require('@/assets/face/lh.jpg'),
          name: "周杰伦3"
        },
        {
          img: require('@/assets/face/tc.png'),
          name: "周杰伦4"
        },
        {
          img: require('@/assets/face/jay.jpg'),
          name: "周杰伦"
        },
        {
          img: require('@/assets/face/jay.jpg'),
          name: "周杰伦"
        },
        {
          img: require('@/assets/face/jay.jpg'),
          name: "周杰伦"
        },
        {
          img: require('@/assets/face/jay.jpg'),
          name: "周杰伦"
        },
        {
          img: require('@/assets/face/jay.jpg'),
          name: "周杰伦"
        },{
          img: require('@/assets/face/jay.jpg'),
          name: "周杰伦"
        }
      ]
    }
  },

  created() {

  },
  mounted() {
  },

}
</script>

<style lang="less" scoped> 
.wrapper{
  height: 100vh;
  padding: 240px 200px 0;
  box-sizing:border-box;
  background:url(../../assets/xsdLiveBg.jpg) no-repeat center center;
  background-size: cover; 
  color: #fff;
}
.item{
}
.userlist{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  .user{
    text-align: center;
    font-size: 16px;
    width: 12.5%;
    margin-bottom: 50px;
    img{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      box-shadow: 0 0 5px 5px rgba(0,0,0,.1);
    }
  }
}
</style>
