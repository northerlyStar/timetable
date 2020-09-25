<template>
  <div class="whim">
    <div class="whimMenu" v-for="(item, index) in routes" :key="index">
      <router-link :to="{name: item.name}" v-if="item.title != '目录'">{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routes: Array,
    };
  },
  mounted () {
    this.getRoute();
  },
  methods: {
    getRoute () {
      let routes = this.$router.options.routes;
      let route = this.$route.matched;
      let a = routes.find((e) => e.name == route[0].name);
      this.routes = a.children;
    },
  },
  watch: {},
  computed: {},
}
</script>
<style scoped>
.whim {
  width: 80%;
  margin: 1em auto;
  text-align: center;
}
.whimMenu a {
  font-size: 25px;
  font-weight: lighter;
  color: #3399cc;
}
</style>