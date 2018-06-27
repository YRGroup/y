<template>
<div>
    <cell :title="i.ClassName+'（'+i.RoleName + '）'" is-link v-for="(i,index) in $store.state.currentUser.Classes" :key="index" @click.native="changeClass(i.ID)">
        <!-- <i slot="icon" class="iconfont">&#xe719;</i> -->
    </cell>
</div>
</template>

<script>
import { Cell } from "vux";
export default {
  components: { Cell },
  data() {
    return {
      currentID: 0
    };
  },
  methods: {
    changeClass(val) {
      let c = this.findClass(val);
      if (!c) return;
      
      this.$API.changeCurrentClass(c).then(res => {
        this.$store.commit("changeCurrentClass", c.ClassID);
        this.$store.dispatch("getCurrentUser");
        // this.$store.dispatch("getCurrentClassInfo");
        this.$emit("success");
        this.$vux.toast.show({
          type: "text",
          width: "20em",
          text: "成功切换当前班级"
        });
      });
    },
    findClass(id) {
      id = parseInt(id);
      let tmp = {};
      this.$store.state.currentUser.Classes.forEach(o => {
        if (o.ID == id) tmp = o;
      });
      return tmp;
    }
  },
  created() {
    this.$store.state.currentUser.Classes.forEach(o => {
      if (o.ClassID == this.$store.state.currentClassId) this.currentID = o.ID;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
