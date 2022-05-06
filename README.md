## figma tokens使用方法

1. 把UI给的figma tokens文件拷贝粘贴到 figma-token/tr-tokens.json
2. 在终端运行`npm run build:token`（运行后会在public/figma-token/oupt文件夹内生成css和json文件，生成方法逻辑在figma-token/build.js，一些特殊css需自己处理）。
3. 在tailwind.config.js内引用figma-token/output/xxx.json文件，示例：
    ```JS
        const { filterTokensByType } = require("./figma-token/fns")
        const tokens = require("./public/figma-token/output/blue.json")
        const colors = filterTokensByType('color', tokens)
        // figma config
        module.exports = {
            theme: {
                extend: {
                    colors
                }
            }
        }
    ```
4. 其他：现在只配置了blue、standard、red、global主题，如果新增主题需要在`package.json`新增`build-transform-xxxx`
5. 更换主题：参考views/theme.vue内更换主题方法
7. 解析figma-token及生成对对应json、css文件原理：https://github.com/six7/figma-tokens-example-tailwindcss
