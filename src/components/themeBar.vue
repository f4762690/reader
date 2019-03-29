<template>
    <div v-show="ifShow">

    </div>
</template>

<script>
    "use strict";
    export default {
        name: "themeBar",
        props:['ifShow'],
        mounted(){
          this.registerTheme();
        },
        methods:{
          registerTheme(){
          }
        }
    }
</script>

<style scoped lang="less">

</style>
