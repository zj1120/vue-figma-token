module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import',
      {
        'libraryName': 'truelore-public',
        'style': false,
      },
    ],
  ],
}
