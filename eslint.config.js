import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default defineConfig([
  // 1. 載入 JS 標準規則
  js.configs.recommended,

  // 2. 載入 Vue 3 規則
  ...pluginVue.configs['flat/essential'],

  // 3. 載入 Prettier 推薦設定 (會自動關閉與 Prettier 衝突的 ESLint 規則)
  eslintPluginPrettierRecommended,

  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // 這裡定義全域變數，避免 'window', 'document' 等報 no-undef 錯誤
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      // Prettier 規則自定義
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: false,
          printWidth: 80,
          trailingComma: 'none',
          endOfLine: 'auto'
        }
      ],
      // Vue 規則
      'vue/multi-word-component-names': ['warn', { ignores: ['index'] }],
      'vue/no-setup-props-destructure': ['off'],

      // 通用 JS 規則
      'no-unused-vars': 'warn',
      'no-undef': 'error'
    }
  },
  // 忽略檔案配置
  {
    ignores: ['dist/**', 'node_modules/**', 'public/**']
  }
])
