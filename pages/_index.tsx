import { Button } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Split Bill APP</title>
        <meta name="split-bill" content="split bill app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.layout}>
        当前没有任何活动
      </main>
    </div>
  )
}

export default Home
