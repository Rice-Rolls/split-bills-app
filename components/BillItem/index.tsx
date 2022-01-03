import { List, Avatar } from "antd"
import Link from "next/link";
import bill from "../../reducer/bill"
import { Bill } from "../../types"

interface Props {
  id: string
  bill: Bill
}

const BillItem = (props: Props) => {
  const { id, bill } = props;
  const description = `参与人：${bill.participants.map(item => item.name).join('，')}`
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar size={'large'}>{bill.billName?.slice(0, 1)}</Avatar>}
        title={<Link href={`/bill?id=${id}`}>{bill.billName}</Link>}
        description={description}
      />
    </List.Item>
  )
}

export default BillItem