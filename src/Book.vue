<template>
    <div class="book">
      <div class="book-wrap">
        <title-bar :showMenu="showMenu"></title-bar>
        <menu-bar :showMenu="showMenu" @action="setTheme"></menu-bar>
        <themeSetting :showSetting="showTheme" :fontList="fontList" @changeFont="changeFont" :themesList="themesList" @setTheme="setDefaultTheme"></themeSetting>
        <catalog :navigation="navigation"  :ifShow="showCat" @jumpTo="jumpTo"></catalog>
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
    import { mapGetters,mapMutations } from 'vuex';
    "use strict";
    import Epub from 'epubjs'
    import titleBar from './components/titleBar'
    import menuBar from './components/menuBar'
    import themeSetting from './components/themeSetting'
    import catalog from './components/catalog'
    const BOOK_URL = './static/book2.epub';
    export default {
        name: "Book",
         components: {menuBar, titleBar,themeSetting,catalog},
      data(){
          return {
            showMenu:false,
            showTheme:false,
            navigation:[],
            showCat:false,
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
            },],
           themesList:[{
              name:'eye1',
              style:{
                'color':'#000',
                'background-color':'#FDE6E0'
              }
           },{
             name:'eye2',
             style:{
               'color':'#000',
               'background-color':'#C7EDCC'
             }
           },{
              name:'eye3',
              style:{
                'color':'#000',
                'background-color':'#FAF9DE'
              }
           },{
             name:'eye4',
             style:{
               'color':'#000',
               'background-color':'#DCE2F1'
             }
           }],
          }
        },
        computed:{
            ...mapGetters(['curProgress','fontSize','curTheme']),
        },
        methods:{
          jumpTo(href){
            if(href)this.rendition.display(href);
            this.showCat = false;
          },

          setProgress(num = 0){
            let progress = num / 100;
            let location = progress >0 ?this.locations.cfiFromPercentage(progress):0;
            this.rendition.display(location);
          },

          setDefaultTheme(name){
            if(this.themes) this.themes.select(name);
            this.setCurTheme(name);
          },
          changeFont(type){
            if(type == 'add'){
              let max = this.fontList[this.fontList.length-1].fontSize;
              this.setFontSize(this.fontSize < max?this.fontSize+2:max)
            }else if(type == 'delete'){
              let min = this.fontList[0].fontSize;
              this.setFontSize(this.fontSize > min?this.fontSize-2:min)
            }
            this.themes.fontSize(this.fontSize+'px')
          },
          setTheme(type){
            switch(type){
              case 'catLog':
                this.showCat = true;
                this.showMenu = false;
                break;
              case 'theme':
                this.showMenu = false;
                this.showTheme = true;
                break;
            }
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
            //获取进度.
            this.book.ready.then(()=>{
              this.navigation = this.book.navigation;
              return this.book.locations.generate();
            }).then(result =>{
              this.locations = this.book.locations;
            })

            this.rendition = this.book.renderTo('book',{
              width:window.innerWidth,
              height:window.innerHeight
            })
            //显示图书
            this.themes = this.rendition.themes;
            this.themes.fontSize(this.fontSize+'px');
            this.themesList.forEach(item=>{
              this.themes.register(item.name,{"body":item.style});
            });
            this.themes.select(this.curTheme);

            let _self = this;
            this.rendition.on('locationChanged', function(locationCfi) {
              _self.setCurProgress(locationCfi);
            });
            this.rendition.display(this.curProgress)
          },
          ...mapMutations(['setCurProgress','setFontSize','setCurTheme'])
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
