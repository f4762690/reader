<template>
  <transition  name="info-classes-transition" enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
    <div class="book-menu" v-show="showMenu">
      <div class="left-menu">
        <i class="icon-arrow-left2"></i>
      </div>
      <div class="right-menu">
        <i class="icon-cart"></i>
        <i class="icon-headphones"></i>
        <i class="icon-paragraph-right"></i>
      </div>
    </div>
  </transition>
</template>

<script>
    "use strict";
    export default {
        name: "titleBar",
        props:['showMenu']
    }
</script>

<style scoped lang="less">
  .book-menu{
    position:absolute;
    top:0;
    height:60px;
    line-height:60px;
    background-color:#fff;
    display:flex;
    width:100%;
    font-size:18px;
    z-index:200;
    box-shadow:0 8px 8px rgba(0,0,0,0.15);
    .left-menu{
      align-self:center;
      flex:0 0 60px;
      text-align: center;
    }
    .right-menu{
      flex:1;
      justify-content: flex-end;
      display:flex;
      i{
        flex:0 0 60px;
        align-self:center;
      }
    }
  }
</style>
