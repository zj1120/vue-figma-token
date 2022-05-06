<template>
  <el-container class="h-full overflow-y-auto">
    <el-aside width="200px">
      <el-select v-model="theme" placeholder="更换主题" @change="toggleTheme">
        <el-option label="blue" value="blue-theme"> </el-option>
        <el-option label="standard" value="standard-theme"> </el-option>
        <el-option label="red" value="red-theme"> </el-option>
      </el-select>
      <el-menu @select="select">
        <el-menu-item v-for="(item, index) in list" :key="index" :index="item.id" :disabled="!!item.disabled" class="truncate">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main class="bg-white">
      <component :is="component" />
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Theme',
  data() {
    return {
      list: [],
      theme: '',
      component: null
    }
  },
  created() {
    // 遍历components下所有vue文件
    const requireComponents = require.context('../components/trueloreUI', true, /\w+\.vue/)
    // 获取所有组件对象，遍历设置
    const list = requireComponents.keys().map((path) => {
      let name = path.split('.vue')[0].substr(2)
      return {
        id: name,
        label: name,
        icon: 'el-icon-location',
        disabled: name === 'highlightjs'
      }
    })
    this.list = list.reverse()

    this.select(list[0].id)

    this.theme = localStorage.getItem('figma-theme') || 'blue-theme'
    this.toggleTheme()
  },
  methods: {
    select(index) {
      const component = require(`../components/trueloreUI/${index}`)
      this.component = Vue.extend({
        ...component.default
      })
    },
    toggleTheme() {
      localStorage.setItem('figma-theme', this.theme)
      document.documentElement.className = this.theme
    }
  }
}
</script>
