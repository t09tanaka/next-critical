import * as React from 'react'
import { Head } from 'next/document'

const CustomHead = (
  WrappedComponent: typeof Head,
  styleSheetContent: string
): typeof Head => {
  // @ts-ignore
  return class extends WrappedComponent {
    constructor(props: any) {
      super(props)
    }

    getCssLinks() {
      // @ts-ignore
      const { assetPrefix, files } = this.context._documentProps
      if (!files || files.length === 0) {
        return null
      }

      const hasCssFiles = files.find(file => /\.css$/.exec(file))

      let isFirst = true

      if(hasCssFiles){
        return files.map((file: string, index: number) => {
          // Only render .css files here
          if (!/\.css$/.exec(file)) {
            return null
          }

          // @ts-ignore
          return (
            <React.Fragment key={`style${index}`}>
              {isFirst && (
                <style
                  dangerouslySetInnerHTML={{
                    __html: styleSheetContent,
                  }}
                />
              )}
              {(isFirst = false)}
              {/*
               // @ts-ignore*/}
              <link
                key={file}
                // @ts-ignore
                nonce={this.props.nonce}
                rel="stylesheet"
                href={`${assetPrefix}/_next/${encodeURI(file)}`}
                media="print"
                // @ts-ignore
                crossOrigin={
                  this.props.crossOrigin ||
                  // @ts-ignore
                  process.crossOrigin
                }
                id={`style${index}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  var css = document.getElementById('${`style${index}`}');
                  css.media = 'all';
              `,
                }}
              />
            </React.Fragment>
          )
        })
      } else {
        return (
          <React.Fragment key={`style`}>
            (
              <style
                dangerouslySetInnerHTML={{
                  __html: styleSheetContent,
                }}
              />
            )
            />
          </React.Fragment>
        )
      }
    }
  }
}

export default CustomHead
