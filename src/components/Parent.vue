<template>
  <div id="parent">
    <div>form 01: {{ newChildLabel }}</div>
    <div>
      <div v-show="isNewChildFocused">{{ helpMessage }}</div>
      <input type="text" v-model="newChild" v-on:click="onFocus" maxlength="30">
      <button v-on:click="onNew">{{ newChildBtnLabel }}</button>
      <div v-show="errorMessage">{{ errorMessage }}</div>
    </div>
    <div>form 02: {{ searchChildLabel }}</div>
    <div>
      <input type="search" v-model="searchChild" v-on:keyup="onSearch">
      <label><input type="radio" value="starts" v-model="searchOption">{{ searchStartLabel }}</label>
      <label><input type="radio" value="includes" v-model="searchOption">{{ searchIncludeLabel }}</label>
      <label><input type="radio" value="ends" v-model="searchOption">{{ searchEndLabel }}</label>
      <label>{{ sortDirectionLabel }}<select v-model="sortDirection" >
        <option value="asc">{{ sortDirectionLabelAsc }}</option>
        <option value="desc">{{ sortDirectionLabelDesc }}</option>
      </select>{{ sortFieldLabel }}
      <select v-model="sortField" >
        <option value="id">{{ sortFieldLabelId }}</option>
        <option value="identifier">{{ sortFieldLabelIdentifier }}</option>
      </select></label>
    </div>
    <div>list: {{ listChildLabel }}</div>
    <div v-show="childDeletedMessage">{{ childDeletedMessage }}</div>
    <Child v-bind:child-collection="nChildCollection" v-on:child-deleted="onChildDeleted" />
  </div>
</template>

<script>
import Child from './Child';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Parent',
  components: {
    Child
  },
  props: {},
  mixins: [],
  watch: {
    childCollection(newValue){
      this.nChildCollection = newValue;
      this.onSearch();
      this.sort();
    },
    searchOption(){
      this.onSearch();
    },
    sortDirection(){
      this.sort();
    },
    sortField(){
      this.sort();
    },
  },
  computed: {
    ...mapGetters({childCollection: 'getterChildCollection'}),
  },
  methods: {
    onFocus(){
      this.isNewChildFocused = true;
      this.errorMessage = '';
    },
    onNew(){
      const newChild = this.newChild.toLowerCase().trim();
      const isAlready = this.childCollection.find(child => child.identifier.toLowerCase() === newChild);
      this.isNewChildFocused = false;
      if(isAlready){
        this.errorMessage = 'the child already exists';
      } else if(!this.isValid(newChild)) {
        this.isNewChildFocused = true;
        this.errorMessage = 'is not valid';
      } else {
        this.errorMessage = '';
        this.addChildAction(newChild);
        this.onSearch();
        this.newChild = '';
      }
    },
    isValid(newChild){
      const regExp = new RegExp('^[\\w\\s]{3,30}$','g');
      return regExp.test(newChild);
    },
    onSearch(){
      const shallChild = this.searchChild.toLowerCase().trim();
      this.nChildCollection = this.childCollection.filter(child => {
        const isChild = child.identifier.toLowerCase();
        switch(this.searchOption){
          case 'starts':
            return isChild.startsWith(shallChild);
          case 'includes':
            return isChild.includes(shallChild);
          case 'ends':
            return isChild.endsWith(shallChild);
        }
      });
      this.sort();
    },
    sort(){
      const sortDirections = {
        asc: (a, b) => {
          if(a[this.sortField] > b[this.sortField]){
            return 1;
          } else if(a[this.sortField] < b[this.sortField]){
            return -1;
          } else {
            return 0;
          }
        },
        desc: (a, b) => {
          if(a[this.sortField] < b[this.sortField]){
            return 1;
          } else if(a[this.sortField] > b[this.sortField]){
            return -1;
          } else {
            return 0;
          }
        }
      };
      this.nChildCollection.sort(sortDirections[this.sortDirection]);
    },
    onChildDeleted({message,id}){
      this.childDeletedMessage = `child No. ${id}: ${message}`;
      const self = this;
      setTimeout(function(){
        self.childDeletedMessage = '';
      },3000);
    },
    ...mapActions(['addChildAction'])
  },
  data(){
    return {
      isNewChildFocused: false,
      helpMessage: 'English letters; digits; whitespace; min. 3 characters; max. 30 characters',
      newChild: '',
      newChildLabel: 'new child',
      searchChildLabel: 'search for child(ren)',
      listChildLabel: 'children',
      errorMessage: '',
      newChildBtnLabel: 'add',
      searchStartLabel: 'starts with',
      searchIncludeLabel: 'includes',
      searchEndLabel: 'ends with',
      searchChild: '',
      searchOption: 'starts',
      childDeletedMessage: '',
      grandChildMessages: [],
      nChildCollection: [],
      sortDirection: 'asc',
      sortField: 'id',
      sortDirectionLabel: 'sort direction',
      sortDirectionLabelAsc: 'up',
      sortDirectionLabelDesc: 'down',
      sortFieldLabel: 'sort field',
      sortFieldLabelId: 'id',
      sortFieldLabelIdentifier: 'name',
    };
  },
  created(){
    this.nChildCollection = this.childCollection;
    this.sort();
  },
  mounted() {},
  updated() {}
}
</script>
<style scoped lang="scss">
#parent {
  & > :nth-child(n){padding:5px;}
  & > :nth-child(1){color:#999999;text-transform:uppercase;padding:15px;}
  & > :nth-child(2){
    & > :nth-child(n){padding:5px 15px;border-radius:5px;margin:5px;vertical-align:middle;}
    & > :nth-child(1){display:inline-block;background-color:#CCE5CC;color:#008000;font-size:0.8em;}
    & > :nth-child(2){display:block;background-color:#F2F2F2;border:1px solid #EEEEEE;padding:10px;width:250px;}
    & > :nth-child(3){background-color:#008000;color:#FFFFFF;border:none;padding:10px 15px;font-size:1.2em;text-transform:uppercase;}
    & > :nth-child(4){display:inline-block;background-color:#E5CCCC;color:#800000;font-size:0.8em;}
  }
  & > :nth-child(3){color:#999999;text-transform:uppercase;padding:15px;}
  & > :nth-child(4){
    background-color:#000080;margin:5px;vertical-align: middle;border-radius:5px;
    & > :nth-child(n){
      padding:5px;margin:5px;
      & > * {padding:2px;margin:2px;vertical-align: middle;}
    }
    & > :nth-child(1){border:none;border-radius:3px;width:250px;padding:10px;color:#000080;font-size:1em;}
    & > :nth-child(2){color:#CCCCE5;font-size:0.8em;}
    & > :nth-child(3){color:#CCCCE5;font-size:0.8em;}
    & > :nth-child(4){color:#CCCCE5;font-size:0.8em;}
    & > :nth-child(5){
      color:#CCCCE5;font-size:0.8em;
      & > * {padding:5px;margin:0 5px;color:#000080;border-radius:5px;border:none;font-size:1.2em;}
    }
  }
  & > :nth-child(5){color:#999999;text-transform:uppercase;padding:15px;}
  & > :nth-child(6){display:inline-block;padding:5px 15px;background-color:darkgoldenrod;color:#FFFFFF;border-radius:5px;}
}
</style>