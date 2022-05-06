<template>
  <div
    class="flex flex-col justify-center items-center h-full text-white text-xl bg-gray-800"
  >
    <span>页面不存在</span>
    <br />
    <el-button @click="back">返回</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
