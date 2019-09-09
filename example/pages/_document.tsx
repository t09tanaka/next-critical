import Document, { Html, Head, Main, NextScript } from 'next/document'
import CustomHead from '../../dist/component'
import { readFileSync } from 'fs'
import * as React from 'react'

let styleSheetContent: string = ''

export default class MyDocument extends Document {
  // @ts-ignore
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    const filePath = `./src/styles/critical.css`
    styleSheetContent = readFileSync(filePath, 'utf8')

    return { ...initialProps }
  }

  render() {
    const PreloadCssHead = CustomHead(Head, styleSheetContent)

    return (
      <Html>
        <PreloadCssHead />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
