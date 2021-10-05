<template>
  <div id="page02">
    <div>{{ header }}</div>
    <button v-on:click="onRedirect"> {{ redirectBtnLabel }}</button>
  </div>
</template>

<script>

export default {
  name: 'Page02',
  components: {},
  data(){
    return {
      header: 'this is page 02',
      redirectBtnLabel: 'redirect to page 01',
    };
  },
  methods: {
    onRedirect(){
      this.$router.push({ name: 'page01', params: { reason: 'coming from page 02' } });
    }
  }
}
</script>
<style scoped lang="scss">
#page02 {
  & > :nth-child(n){padding:5px;margin:5px;}
  & > :nth-child(1){padding:5px 15px;background-color:darkgoldenrod;color:#FFFFFF;border-radius:5px;}
}
</style>

