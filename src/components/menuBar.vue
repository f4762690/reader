<template>
  <transition  name="info-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
    <div class="book-footer" v-show="showMenu">
      <i class="icon-list"></i>
      <i class="icon-sun"></i>
      <i class="icon-moon"></i>
      <i class="icon-cog" @click="$emit('action');"></i>
    </div>
  </transition>
</template>

<script>
    "use strict";
    export default {
        name: "menuBar",
        props:['showMenu']
    }
</script>

<style scoped lang="less">
  .book-footer{
    position:absolute;
    bottom:0;
    height:60px;
    width:100%;
    background-color:#fff;
    box-shadow: 0 -8px 8px rgba(0,0,0,0.15);
    text-align:center;
    display:flex;
    z-index:200;
    align-content: center;
    i{
      align-self:center;
      flex:1;
      font-size:18px;
    }
  }
</style>
