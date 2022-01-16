import { Modal, Switch, Form, Tag, Button } from 'antd';
import ShareImg from 'components/ShareImg';
import { countBill } from 'helper';
import { useAppSelector } from 'hooks/reducer';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
import React from 'react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

interface Props {
  visible: boolean
  open: () => void
  close: () => void
}

const GetBillModal = (props: Props) => {
  const { visible, open, close } = props;
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter()
  const { expenses } = useAppSelector(state => state.expenseStore)
  const { id } = router.query as { id: string }
  const { bills } = useAppSelector(state => state.billStore)
  const billInfo = bills[id];
  const [useTarget, setUseTarget] = useState(!!billInfo.target)
  const [lastBill, setLastBill] = useState<{
    debtor: string;
    receiver: string;
    pay: number;
  }[]>([]);

  const onShareImg = () => {
    Modal.info({
      title: '账单详情',
      content: <ShareImg container={container} />,
    })
  }

  useEffect(() => {
    const bill: Record<string, number> = {};
    expenses.map(item => {
      const { payer, per, total } = item;
      Object.keys(per).map((perItem) => {
        if(perItem !== payer) {
          bill[perItem] = (bill[perItem] ?? 0) - Number(per[perItem]);
        } else {
          bill[perItem] = (bill[perItem] ?? 0) + (Number(total) - per[perItem]);
        }
      })
    })
    const lastBill = useTarget ? countBill(bill, billInfo.target) : countBill(bill);
    setLastBill(lastBill);
  }, [expenses, useTarget])

  return (
    <Modal
      title="计算账单"
      visible={visible}
      onCancel={close}
    >
      <div>
        <Form.Item label="使用主要收款人">
          <Switch checked={useTarget} onChange={setUseTarget} />
        </Form.Item>
        <div ref={container} style={{ width: 'fit-content' }} >
          <p>账单名称: {billInfo.billName}</p>
          {lastBill.map(item => {
            const { debtor, receiver, pay } = item;
            return (
              <div key={`${debtor}-${receiver}-${pay}`} style={{ width: 'fit-content' }}>
                <Tag>{debtor}</Tag>支付给 <Tag>{receiver}</Tag>{pay} 元
              </div>
            )
          })}
        </div>
        <div className={styles.shares}>
          <Button disabled type='primary'>分享链接</Button>
          <Button type='primary' onClick={onShareImg}>生成图片分享</Button>
        </div>
      </div>
    </Modal>
  )
}

export default GetBillModal;