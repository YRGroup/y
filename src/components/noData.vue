<template>
<div class="panel">
    <div class="noData">
        <img :src="nodataPic">
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            nodataPic: require('@/assets/nodata.png')
        }
    }
}
</script>

<style lang="less" scoped>
.noData {
    margin-top: 20px;
    min-height: 100px;
    line-height: 100px;
    text-align: center;
    img{
        max-width: 50%;
    }
}
</style>
