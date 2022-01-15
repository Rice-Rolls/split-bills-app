import { Avatar, Button, Empty, List } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import useModalHooks from 'hooks/useModal'
import { useAppSelector } from 'hooks/reducer'
import BillItem from 'components/BillItem'
import { NewBill } from 'components'

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
        <NewBill type="new" />
      </main>
    </div>
  )
}

export default Home
