import htmlParser, { HTMLReactParserOptions } from 'html-react-parser'

type HtmlParserOptions = HTMLReactParserOptions

export function parseHtml (htmlString: string, options?: HtmlParserOptions) {
    return htmlParser(htmlString || '', options)
}

// TODO create mapping for each base tags to antd tags like <p> -> <Typograph.Paragraph>