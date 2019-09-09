# Next Critical CSS⚡

Next Critical CSS is a plug in that improve your web site speed.

## How to use

Install:

```
npm i -S next-critical
```

Create custom head component with your Critical CSS in _document.js.

```typescript:_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document'
import CustomHead from 'next-critical'
import { readFileSync } from 'fs'
import * as React from 'react'

let styleSheetContent: string = ''

export default class MyDocument extends Document {
  // @ts-ignore
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    // Your critical css file
    const filePath = `./src/styles/critical.css`
    styleSheetContent = readFileSync(filePath, 'utf8')

    return { ...initialProps }
  }

  render() {
    const CriticalCssHead = CustomHead(Head, styleSheetContent)

    return (
      <Html>
        <CriticalCssHead />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

#### Related links

[zeit/next.js](https://github.com/zeit/next.js) - Framework for server-rendered React applications