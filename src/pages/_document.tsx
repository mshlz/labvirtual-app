import Document, { Head, Html, Main, NextScript } from 'next/document'

class LabAppDocument extends Document {
    render() {
        return <>
            <Html>
                <Head></Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        </>
    }
}

export default LabAppDocument