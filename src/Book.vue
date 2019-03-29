<template>
    <div class="book">
      <div class="book-wrap">
        <title-bar :showMenu="showMenu"></title-bar>
        <menu-bar :showMenu="showMenu" @action="setTheme"></menu-bar>
        <themeSetting :showSetting="showTheme" :fontList="fontList" :defaultSize="defaultSize" @changeFont="changeFont"></themeSetting>
        <div id="book">
          <div class="mask">
            <div class="left" @click.stop.prevent="prevPage">
            </div>
            <div class="center" @click="showMenu = !showMenu;showTheme = false">
            </div>
            <div class="right"  @click.stop.prevent="nextPage">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    "use strict";
    import Epub from 'epubjs'
    import titleBar from './components/titleBar'
    import menuBar from './components/menuBar'
    import themeSetting from './components/themeSetting'
    const BOOK_URL = './static/book2.epub';
    export default {
        name: "Book",
         components: {menuBar, titleBar,themeSetting},
      data(){
          return {
            showMenu:false,
            showTheme:false,
            defaultSize:12,
            fontList:[{
              fontSize:12
            },{
              fontSize:14
            },{
              fontSize:16
            },{
              fontSize:18
            },{
              fontSize:20
            },{
              fontSize:22
            },{
              fontSize:24
            },]
          }
        },
        methods:{
          changeFont(type){
            if(type == 'add'){
              let max = this.fontList[this.fontList.length-1].fontSize;
              this.defaultSize = this.defaultSize < max?this.defaultSize+2:max;
            }else if(type == 'delete'){
              let min = this.fontList[0].fontSize;
              this.defaultSize = this.defaultSize > min?this.defaultSize-2:min;
            }
            this.themes.fontSize(this.defaultSize+'px')
          },
          setTheme(){
            this.showMenu = false;
            this.showTheme = true;
          },
          prevPage(){
            this.showMenu = false
            if(this.rendition) this.rendition.prev()
          },

          nextPage(){
            this.showMenu = false
            if(this.rendition) this.rendition.next()
          },

          getBook(){
            //获取图书，解析
            this.book = new Epub(BOOK_URL);
            //挂在元素id上
            this.rendition = this.book.renderTo('book',{
              width:window.innerWidth,
              height:window.innerHeight
            })
            //显示图书
            this.themes = this.rendition.themes;
            this.themes.fontSize(this.defaultSize+'px');
            this.rendition.display()
          }
        },
        mounted(){
          this.getBook();
        }
    }
</script>

<style scoped lang="less">
  .book-wrap{
    position:relative;
    .mask{
      position:absolute;
      top:0;
      left:0;
      display:flex;
      width:100%;
      height:100%;
      z-index:100;
      .left{
        flex: 0 0 100px;
      }
      .center{
        flex:1;
      }
      .right{
        flex:0 0 100px;
      }
    }
  }

</style>
