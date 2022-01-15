import { Modal, Switch, Form, Tag } from 'antd';
import { countBill } from 'helper';
import { useAppSelector } from 'hooks/reducer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  visible: boolean
  open: () => void
  close: () => void
}

const GetBillModal = (props: Props) => {
  const { visible, open, close } = props;
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
      <Form.Item label="使用主要收款人">
        <Switch checked={useTarget} onChange={setUseTarget} />
      </Form.Item>
      {lastBill.map(item => {
        const { debtor, receiver, pay } = item;
        return (
          <div key={`${debtor}-${receiver}-${pay}`}>
            <Tag>{debtor}</Tag>支付给 <Tag>{receiver}</Tag>{pay} 元
          </div>
        )
      })}
    </Modal>
  )
}

export default GetBillModal;