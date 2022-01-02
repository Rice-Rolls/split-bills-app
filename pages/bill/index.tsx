import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { Expense, FormValues } from '../../types'
import Link from 'next/link'
import styles from './index.module.scss'
import { MenuFoldOutlined } from '@ant-design/icons'
import { Avatar, Button, List } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { AddNewExpense } from '../../components'


const Home: NextPage = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  
  const [expenseList, setExpenseList] = useState<Expense[]>([]);

  const formValues: FormValues = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(id) || '{}')
    } catch (error) {
      return {}
    }
  }, [id])

  if (!formValues) {
    return (
      <div>
        <main>
          <Link href="/">
            <a>数据失效，返回主页</a>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>{formValues?.billName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.menu}>
            <MenuFoldOutlined className={styles.menuIcon} />
          </div>
          <div className={styles.editBill}>
            <Button>编辑账单信息</Button>
          </div>
        </div>
        <Meta
          className={styles.billInfo}
          avatar={<Avatar size={'large'}>{formValues.billName?.slice(0, 1)}</Avatar>}
          title={formValues.billName}
        />
        <List
          className={styles.expenseList}
          itemLayout="horizontal"
          dataSource={expenseList}
          renderItem={item => (
            <List.Item
              actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
            >
              <List.Item.Meta
                avatar={<Avatar />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
        <AddNewExpense />
      </main>
    </div>
  )
}

export default Home
