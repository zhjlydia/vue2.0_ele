<template>
    <div class="header">
        我是模板
    </div>
</template>
<script>
export default {
  name: 'header',
  data() {
    return {
      seller:{}
    };
  },
  created(){

  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.tab
    display:flex
    width:100%
    height:40px
    line-height:40px

.tab-item
    flex:1
    text-align:center
    font-size:14px
    color:rgba(77,85,93,0.8)
    display:block
.active
    color: rgb(240, 20, 20)

</style>