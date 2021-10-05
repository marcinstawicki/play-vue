<template>
  <div id="page01">
    <div v-show="reasonMessage">{{ reasonMessage }}</div>
    <Parent />
  </div>
</template>

<script>

import Parent from "../components/Parent";

export default {
  name: 'Page01',
  components: {
    Parent
  },
  data(){
    return {
      reasonMessage: ''
    };
  },
  methods: {
    onReason(){
      if(typeof this.$route.params.reason !== 'undefined'){
        this.reasonMessage = this.$route.params.reason;
        const self = this;
        setTimeout(function(){
          self.reasonMessage = '';
        },3000);
      } else {
        this.reasonMessage = '';
      }
    }
  },
  created() {
    this.onReason();
  },
}
</script>
<style scoped lang="scss">
#page01 {
  & > :nth-child(1){display:inline-block;padding:5px 15px;background-color:darkgoldenrod;color:#FFFFFF;border-radius:5px;}
}
</style>
