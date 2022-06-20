import '../styles/globals.css'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/react'

const meta = {
    title: "Volume Up | Music Everywhere",
    viewport: "width=device-width, initial-scale=1.0",
    description: "A Spotify Clone Website to Play Music Everywhere.",
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <SessionProvider session={session}>
            <RecoilRoot>
                <Head>
                    <title>{meta.title}</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="viewport" content={meta.viewport} />
                    <meta name="description" content={meta.description} />
                </Head>
                <Component {...pageProps} />
            </RecoilRoot>
        </SessionProvider>
    )
}

export default MyApp
