<template>
    <div class="wrap" v-show="showSetting">
    <div class="font-wrap">
      <div class="left-context" :style="{fontSize:fontList[0].fontSize+'px'}" @click="$emit('changeFont','delete')">
        A
      </div>
      <div class="point-wrap">
        <div class="point-content" v-for="(item,index) in fontList" :key="index">
          <div class="line">
          </div>
          <div class="point" v-show="fontSize == item.fontSize">

          </div>
          <div class="line">
          </div>
        </div>
      </div>
      <div class="right-context" :style="{fontSize:fontList[fontList.length-1].fontSize+'px'}" @click="$emit('changeFont','add')">
        A
      </div>
    </div>
    <div class="theme-wrap">
      <ul>
        <li v-for="(item,index) in themesList" :key="index" @click="$emit('setTheme',item.name);aIndex = index" :class="{'active':curTheme == item.name}" :style="{'background-color':item['style']['background-color']}">
        </li>
      </ul>
    </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    "use strict";
    export default {
        name: "themeSetting",
        props:['showSetting','fontList','themesList'],
        computed:{
          ...mapGetters(['fontSize','curTheme'])
        }
    }
</script>

<style scoped lang="less">
  .wrap{
    z-index:200;
    position:absolute;
    bottom:0;
    left:0;
    width:100%;
    background-color:#fff;
    box-shadow:0 -8px 8px rgba(0,0,0,.15);
    height:120px;
    .font-wrap{
      width:100%;
      display:flex;
      height:40px;
      align-items:center;
      .left-context{
        flex: 0 0 40px;
        text-align:center;
      }
      .point-wrap{
        flex:1;
        display:flex;
        .point-content{
          flex:1;
          display:flex;
          &:first-child{
            flex:0 0 0;
            width:0;
          }
          &:last-child{
            flex:0 0 0;
            width:0;
          }
          .line{
            flex:1;
            height:1px;
            background-color:#ccc;
          }
          .point{
            width:1px;
            flex:0 0 1px;
            height:7px;
            background-color:#ccc;
            position:relative;
            top:-3px;
          }
        }
      }

      .right-context{
        flex: 0 0 40px;
        text-align:center;
      }
    }

    .theme-wrap{
      ul{
        display:flex;
        width:100%;
        li{
          flex:1;
          height:30px;
          border-radius:5px;
          margin:10px;
          &.active{
            border:1px solid red;
          }
        }
      }

    }

  }

</style>
