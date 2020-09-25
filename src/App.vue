<template>
  <el-container id="app">
    <el-header style="background-color: #f9f7ec;">
      <navigation></navigation>
    </el-header>
    <el-main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-main>
    <!-- <foot></foot> -->
  </el-container>
</template>

<script>
import navigation from './components/navigation'
// import foot from './components/foot'
export default {
  name: 'App',
  components: {
    navigation,
    // foot
  }
}
</script>

<style>
#app {
  position: relative;
}
.el-main {
  overflow: visible;
}
/* 滚动条整体样式 */
::-webkit-scrollbar {
  display: none;
  width: 8px;
}
/* 滚动条里面小方块 */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: #eeeeee;
}
/* 滚动条里面轨道 */
::-webkit-scrollbar-track {
  border-radius: 8px;
}
</style>
