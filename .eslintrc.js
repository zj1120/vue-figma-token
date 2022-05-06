module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  globals: {
    onMounted: true,
    onUnmounted: true,
    ref: true,
    unref: true,
    reactive: true,
    computed: true,
    watch: true,
    defineExpose: true,
    getCurrentInstance: true,
    defineProps: true,
    appConfig: true,
    toRef: true,
    toRefs: true,
    useRouter: true,
    useStore: true,
    onBeforeUnmount: true,
    defineEmits: true,
    nextTick: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    'no-useless-escape': 0,
    'vue/no-side-effects-in-computed-properties': 0
  }
}
