<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
window.onresize = ()=>{
  let htmlObj = document.querySelector('html');
  htmlObj.style.fontSize = window.innerWidth/10 +'px';
}

</script>

<style>
</style>
