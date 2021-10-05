<template>
    <div id="nav">
      <router-link to="/" v-bind:class="onActive('page01')">Page 01</router-link>
      <router-link to="/page02" v-bind:class="onActive('page02')">Page 02</router-link>
      <router-link to="/page03" v-bind:class="onActive('page03')">{{ page03Message }}</router-link>
      <button v-show="!isAuthenticated" v-on:click="onAuthenticate">{{ authLabel }}</button>
    </div>
    <router-view/>
</template>
<script>

import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'App',
  watch: {
    isAuthenticated(newValue){
      this.page03Message = newValue === true ? 'Page 03' : this.page03Message;
      this.$router.push({name: this.$route.name});
    }
  },
  computed: {
    ...mapGetters({
      activePage: 'getterActivePage',
      isAuthenticated: 'getterIsAuthenticated',
    }),
  },
  methods: {
    onAuthenticate() {
      this.isAuthenticatedAction(true);
    },
    onActive(shallPage){
      return shallPage === this.activePage ? 'active' : '';
    },
    ...mapActions(['isAuthenticatedAction'])
  },
  data() {
    return {
      page03Message: 'Page 03 is private: first authenticate to see the content',
      authLabel: 'please authenticate'
    };
  },
  created(){
    this.page03Message = this.isAuthenticated ? 'Page 03' : this.page03Message;
  },
  mounted(){},
  updated(){}
}
</script>
<style lang="scss">
  * {box-sizing: border-box;padding:0;margin:0;font-family: Arial, Helvetica, sans-serif;}
  #nav {
    padding:5px;background-color:#F6F6F6;
    & > :nth-child(n){display:inline-block;vertical-align:middle;padding:7px 15px;border-bottom:3px solid transparent;text-decoration:none;color:#000080;}
    & > :nth-child(n).active {border-bottom:3px solid #000080;}
    & > :nth-child(4) {border:1px solid #000080;border-radius:5px;background-color:#FFFFFF;color:#000080;}
  }
</style>
