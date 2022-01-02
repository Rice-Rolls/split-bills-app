import { Button, Empty } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NewBillModal } from '../components/index'
import { useState } from 'react'
import useModalHooks from '../hooks/useModal'

const Home: NextPage = () => {
  const [visible, open, close] = useModalHooks(false)
  return (
    <div className={styles.container}>
      <Head>
        <title>Split Bill APP</title>
        <meta name="split-bill" content="split bill app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Empty description={false} />
        <Button onClick={open}>新建账单</Button>
        <NewBillModal
          visible={visible}
          handleOk={open}
          handleCancel={close}
        /> 
      </main>
    </div>
  )
}

export default Home
