<template>
    <!--导航按钮-->
    <div class="header-left"><a href="javascript:;" class="menu" @click="tapnav"></a></div>
</template>
<script>
    import { incrementCounter } from '../vuex/actions'
    export default{
      vuex: {
        actions: {
          tapnav: incrementCounter
        }
      }
    }
</script>
