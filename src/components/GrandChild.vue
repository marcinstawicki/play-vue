<template>
  <div class="grandchild">
    <div>{{ child.id }}</div>
    <div>{{ child.identifier }}</div>
    <slot v-bind:characters="characters">fallback</slot>
  </div>
</template>

<script>

export default {
  name: 'GrandChild',
  components: {},
  props: {
    child: {
      type: Object,
      required: true
    }
  },
  mixins: [],
  watch: {},
  computed: {},
  methods: {},
  data(){
    return {
      characters: []
    };
  },
  created() {
    this.characters = [...this.child.identifier];
  },
  mounted() {},
  updated() {}
}
</script>
<style scoped lang="scss">
.grandchild {
  & > :nth-child(n){display:inline-block;vertical-align:middle;padding:7px 15px;}
  & > :nth-child(1){min-width:45px;text-align:right;font-size:0.8em;}
  & > :nth-child(2){min-width:250px;text-align:left;}
}
</style>