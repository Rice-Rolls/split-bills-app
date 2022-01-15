import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Expense, Bill } from 'types/'
import Link from 'next/link'
import styles from './index.module.scss'
import { MenuFoldOutlined } from '@ant-design/icons'
import { Avatar, Button, List } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { AddNewExpense, NewBill } from 'components'
import { useAppDispatch, useAppSelector } from 'hooks/reducer'
import { setExpense } from 'reducer/expense'
import { expenseTypeList } from 'constants/index'
import ExpenseInfo from 'components/Modals/ExpenseInfo'
import GetBill from 'components/Modals/GetBill'


const Home: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { expenses } = useAppSelector(state => state.expenseStore)
  const { id } = router.query as { id: string }
  const { bills } = useAppSelector(state => state.billStore)
  const bill = bills[id];

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem(id) || '[]')
    dispatch(setExpense(expenses))
  }, [id])


  if (!bill) {
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
    <div className={styles.wrapper}>
      <Head>
        <title>{bill?.billName}</title>
        <meta name="split-bill" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.menu}>
            <MenuFoldOutlined className={styles.menuIcon} />
          </div>
          <div className={styles.editBill}>
            <NewBill type="edit" />
          </div>
        </div>
        <div className={styles.billInfo}>
          <Avatar size={'large'}>{bill.billName?.slice(0, 1)}</Avatar>
          <h3 className={styles.billName}>{bill.billName}</h3>
        </div>
        <h3>账单列表</h3>
        <List
          className={styles.expenseList}
          itemLayout="horizontal"
          dataSource={expenses}
          renderItem={item => (
            <List.Item
              actions={[<ExpenseInfo key={item.id} expense={item} bill={bill} id={id} />]}
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" icon={expenseTypeList.find(item => item.type === item.type)?.icon} />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
        <AddNewExpense id={id} bill={bill} />
      </main>
      <GetBill />
    </div>
  )
}

export default Home
