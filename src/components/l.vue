<template>
  <div>
    <p style="color:red">tttt</p>
    <div class="newless"></div>
  </div>
</template>

<script>
export default {
  name: 'less',
  data () {
    return {
      msg:'00'
    }
  }
}
</script>

<style lang="less" scoped >
@hong:#e74c3c;//红
@hong2:#c0392b;//深红

@cheng:#e67e22;//橙
@cheng2:#d35400;//红橙

@huang:#f1c40f;//黄
@huang2:#f39c12;//橘黄

@lv:#2ecc71;//绿
@lv2:#27ae60;//深绿

@qing:#1abc9c;//靛
@qing2:#16a085;//深靛

@lan:#3498db;//蓝
@lan2:#2980b9;//深蓝

@zi:#9b59b6;//紫
@zi2:#8e44ad;//深紫

@mo:#34495e;//墨
@mo2:#2c3e50;//重墨

@hui:#95a5a6;//灰
@hui2:#7f8c8d;//深灰

@bai:#ecf0f1;//浅灰白
@bai2:#bdc3c7;//灰白

.newless{
  width:10em;
  height:10em;
  background-color: @bai2;
}
</style>
