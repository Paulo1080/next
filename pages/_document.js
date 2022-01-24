import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return(
            <Html>
                <Head>

                </Head>
                    <link rel="shortcut icon" href='favicon.ico' type="image/x-icon"/>
                <body>
                    <Main/>
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;