import { Avatar, Button, Empty, List } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import { NewBillModal } from 'components/index'
import { useState } from 'react'
import useModalHooks from 'hooks/useModal'
import { useAppSelector } from 'hooks/reducer'
import BillItem from 'components/BillItem'

const Home: NextPage = () => {
  const [visible, open, close] = useModalHooks(false)
  const { bills } = useAppSelector(state => state.billStore)
  return (
    <div className={styles.container}>
      <Head>
        <title>Split Bill APP</title>
        <meta name="split-bill" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <List 
          style={{ width: '100%' }}
          itemLayout="horizontal"
          dataSource={Object.keys(bills)}
          renderItem={(id) => {
            const bill = bills[id]
            return (
              <BillItem id={id} bill={bill} />
            )
          }}
        />
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
