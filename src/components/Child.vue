<template>
  <div class="child" v-for="child in childCollection" :key="child.id">
    <GrandChild v-bind:child="child" >
      <template v-slot:default="slotProps">
          <div>{{ slotProps.characters[0] }}</div>
      </template>
    </GrandChild>
    <button v-on:click="onDelete(child.id)">{{ deleteBtnLabel }}</button>
  </div>
</template>

<script>
import GrandChild from "./GrandChild";
import { mapActions } from 'vuex';

export default {
  name: 'Child',
  components: {
    GrandChild
  },
  props: {
    childCollection: {
      type: Array,
      required: true
    }
  },
  mixins: [],
  watch: {},
  emits: ['child-deleted'],
  computed: {},
  methods: {
    onDelete(id){
      this.$emit('child-deleted',{ message: 'deleted successfully', id });
      this.deleteChildAction(id);
    },
    ...mapActions(['deleteChildAction'])
  },
  data(){
    return {
      deleteBtnLabel: 'delete'
    };
  },
  created() {},
  mounted() {},
  updated() {}
}
</script>
<style scoped lang="scss">
.child {
  background-color:#F2F2F2;margin:1px 0;
  & > :nth-child(n){display:inline-block;vertical-align:middle;padding:7px 15px;}
  & > :nth-child(1){
    min-width:250px;
    & > :nth-child(3){min-width:45px;text-transform:uppercase;color:#777777;}
  }
  & > :nth-child(2){background-color:#800000;color:#FFFFFF;border:none;border-radius:5px;}
}
</style>