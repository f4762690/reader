import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  curProgress:0,
  chapter:'',
  fontSize:12,
  curTheme:'',
};

const getters = {
  curProgress:state => state.curProgress,
  chapter:state => state.chapter,
  fontSize:state => state.fontSize,
  curTheme:state => state.curTheme,
};

const mutations = {
  setCurTheme(state,theme = 'eye1'){
    state.curTheme = theme;
    window.syncConfig('theme',theme)
  },
  setFontSize(state,fontSize = 12){
    state.fontSize = fontSize;
    window.syncConfig('fontSize',fontSize);
  },
  setCurProgress(state,progress){
    state.curProgress = progress;
    window.syncConfig('curProgress',progress);
  }
};

const actions = {

};

mutations.init = function(){
  window.configGet('curProgress',(data)=>{
    state.curProgress = data.start||0;
    state.chapter = data.href||'';
  })

  window.configGet('fontSize',(data)=>{
    state.fontSize = data||12;
  })

  window.configGet('theme',(data)=>{
    state.curTheme = data||'eye1';
  })
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
