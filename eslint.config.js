import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig(
  {
    ignores: ['dist/'],
  },
  // javascript
  js.configs.recommended,
  // typescript
  ts.configs.recommended,
  ts.configs.strict,
  ts.configs.stylistic,
  // stylistic
  stylistic.configs.recommended,
)
