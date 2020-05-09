# use-fauna

> React hooks for FaunaDB

[![NPM](https://img.shields.io/npm/v/use-fauna.svg)](https://www.npmjs.com/package/use-fauna) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-fauna
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'use-fauna'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [ryancharris](https://github.com/ryancharris)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
