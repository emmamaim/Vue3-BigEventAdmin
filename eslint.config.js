export default defineConfig([
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  // 先載入推薦設定
  eslintPluginPrettierRecommended, 
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser
    },
    rules: {
      // 確保這些規則是最後被套用的，這會覆蓋 PrettierRecommended 的預設值
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: false,
          printWidth: 80,
          trailingComma: 'none', // 這裡強制不加逗號
          endOfLine: 'auto'
        }
      ],
      'vue/multi-word-component-names': ['warn', { ignores: ['index'] }],
      'no-unused-vars': 'warn',
      'vue/no-setup-props-destructure': ['off'],
      'no-undef': 'error'
    }
  }
])
