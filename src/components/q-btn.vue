<template>
  <button 
  :class="[
      {
        'btn-rounded': rounded,
        'btn-pill':pill
      }
    ]"
  ><slot></slot>
  </button>
</template>

<script>
export default {
  props:{
    rounded:Boolean,
    pill:Boolean
  }
}
</script>

<style scoped>
*{
  transition: all .3s;
}
button,button:hover,button:active,button:focus{
  border: none;
  outline:none;
}
button{
  padding:0.7em 2em;
  cursor: pointer;
  text-align: center;
  white-space:nowrap;
  color:#FFF;
  min-width:8em;
  height:2.7em;
}
/* 形状 */
.btn-rounded{
  border-radius: 4px;
}
.btn-pill{
  border-radius: 200px;
}
/*flat颜色*/
.primary{
  background-color: #1B9AF7
}
.primary:hover{
  background-color: #4cb0f9
}
.success{
  background-color: #A5DE37
}
.success:hover{
  background-color: #b9e563
}
.warning{
  background-color: #FEAE1B
}
.warning:hover{
  background-color: #fec04e
}
.danger{
  background-color: #FF4351
}
.danger:hover{
  background-color: #ff7680
}
.royal{
  background-color: #7B72E9
}
.royal:hover{
  background-color: #a49ef0
}
/*呼吸效果*/
.glowing-primary{
  background-color: #FFF;
  animation: glowing-primary infinite 3s;
  color:#1B9AF7;
  border:1px solid #1B9AF7;
}
.glowing-primary:hover{
  color:#fff;
  background-color: #1B9AF7;
  border:1px solid #1B9AF7;
}
@keyframes glowing-primary {
    from {
        box-shadow: 0 0 0 rgba(27, 154, 247, 0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(27, 154, 247, 0.8);
    }
    to {
        box-shadow: 0 0 0 rgba(27, 154, 247, 0.3);
    }
}
.glowing-red{
  background-color: #FFF;
  animation: glowing-red infinite 3s;
  color:#e74c3c;
  border:1px solid #e74c3c;
}
.glowing-red:hover{
  color:#fff;
  background-color: #e74c3c;
  border:1px solid #e74c3c;
}
@keyframes glowing-red {
    from {
        box-shadow: 0 0 0 rgba(231, 76, 60,0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(231, 76, 60,0.8);
    }
    to {
        box-shadow: 0 0 0 rgba(231, 76, 60,0.3);
    }
}
.glowing-orange{
  background-color: #FFF;
  animation: glowing-orange infinite 3s;
  color:#e67e22;
  border:1px solid #e67e22;
}
.glowing-orange:hover{
  color:#fff;
  background-color: #e67e22;
  border:1px solid #e67e22;
}
@keyframes glowing-orange {
    from {
        box-shadow: 0 0 0 rgba(230, 126, 34,0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(230, 126, 34,0.8);
    }
    to {
        box-shadow: 0 0 0 rgba(230, 126, 34,0.3);
    }
}
.glowing-green{
  background-color: #FFF;
  animation: glowing-green infinite 3s;
  color:#2ecc71;
  border:1px solid #2ecc71;
}
.glowing-green:hover{
  color:#fff;
  background-color: #2ecc71;
  border:1px solid #2ecc71;
}
@keyframes glowing-green {
    from {
        box-shadow: 0 0 0 rgba(46, 204, 113,0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(46, 204, 113,0.8);
    }
    to {
        box-shadow: 0 0 0 rgba(46, 204, 113,0.3);
    }
}
.glowing-purple{
  background-color: #FFF;
  animation: glowing-purple infinite 3s;
  color:#9b59b6;
  border:1px solid #9b59b6;
}
.glowing-purple:hover{
  color:#fff;
  background-color: #9b59b6;
  border:1px solid #9b59b6;
}
@keyframes glowing-purple {
    from {
        box-shadow: 0 0 0 rgba(155, 89, 182,0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(155, 89, 182,0.8);
    }
    to {
        box-shadow: 0 0 0 rgba(155, 89, 182,0.3);
    }
}
</style>