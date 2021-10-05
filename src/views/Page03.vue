<template>
  <div id="page03">
    <div>{{ message }}</div>
  </div>
</template>

<script>

export default {
  name: 'Page03',
  data(){
    return {
      message: 'this is page 03 and its private content is shown after user has been authenticated',
    };
  },
  created() {}
}
</script>
<style scoped lang="scss">
#page03 {
  & > :nth-child(n){padding:5px;margin:5px;}
  & > :nth-child(1){padding:5px 15px;background-color:darkgoldenrod;color:#FFFFFF;border-radius:5px;}
}
</style>

