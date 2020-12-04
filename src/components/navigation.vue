<template>
  <div>
    <!--头部-->
    <el-row class="header">
      <el-col :lg="5" :md="5" :sm="5" :xs="22" class="hTitle"
        >Informal Essay</el-col
      >
      <!--下拉列表-->
      <el-col :lg="19" :md="19" :sm="19" :xs="0">
        <ul class="hMenu">
          <router-link
            v-for="(item, index) in route"
            :key="index"
            :to="{ path: item.path }"
          >
            <li class="menu">{{ item.title }}</li>
          </router-link>
        </ul>
      </el-col>
      <el-col :lg="0" :md="0" :sm="0" :xs="2">
        <i
          class="el-icon-more el-icon--right"
          style="font-size: 24px; color: #3399cc"
          @click="drawer = true"
        ></i>
      </el-col>
      <el-drawer
        :visible.sync="drawer"
        title="menu"
        :with-header="false"
        direction="rtl"
        :size="'40%'"
      >
        <router-link
          v-for="(item, index) in route"
          :key="index"
          :to="{ path: item.path }"
        >
          <div class="item_box" @click="drawer = false">{{ item.title }}</div>
        </router-link>
      </el-drawer>
    </el-row>
  </div>
</template>

<script>
import route from "../router/config";
export default {
  data() {
    return {
      route: route,
      drawer: false,
    };
  },
  mounted() {},
  methods: {},
  watch: {},
  computed: {},
};
</script>
<style scoped>
.item_box {
  color: #3399cc;
  padding: 10px 5px 0 10px;
  font-size: 1rem;
}
</style>