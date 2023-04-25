import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Aim Trainer</title>
        <meta name="description" content="Online aim trainer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={``}>
        <h1>Aim trainer</h1>
        <p>Select a game from the list below.</p>
        <div>
         <Link href="/initialgame">Initial Game!</Link>
         <p>This is the first iteration of the aim trainer. Try to hit as many targets as possible within the time limit</p>
        </div>
      </main>
    </>
  )
}
