<template>
  <div class="wrap" v-if="ifShow">
    <transition  name="info-classes-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
      <ul class="left-part">
        <li v-for="(item,index) in navigation.toc" :key=index @click.stop.prevent="$emit('jumpTo',item.href)" :style="item.href == chapter?'color:red':''">
          {{item.label}}
        </li>
      </ul>
    </transition>
    <transition name="info-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="bg" @click.stop.prevent="$emit('jumpTo',false)"></div>
    </transition>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    "use strict";
    export default {
        name: "catalog",
        data(){
          return {

          }
        },
        props:['navigation','ifShow'],
        computed:{
          ...mapGetters(['chapter'])
        }
    }
</script>

<style scoped lang="less">
  .wrap{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:200;
    display:flex;
    .left-part{
      overflow:scroll;
      -webkit-overflow-scrolling: touch;
      flex:4;
      background-color:#fff;
      li{
        padding:10px 0 10px 10px;
        border-bottom:1px solid #ccc;
        cursor:pointer;
      }
    }
    .bg{
      flex:1;
      height:100%;
      background-color:rgba(0,0,0,.8);
    }
  }

</style>
