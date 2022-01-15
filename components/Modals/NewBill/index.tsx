import {
  Button,
  Modal,
} from "antd";
import styles from "./index.module.scss";
import useModalHooks from "hooks/useModal";
import { useForm } from "antd/lib/form/Form";
import NewBillModal from './NewBillModal'
import { useRouter } from "next/router";
import { useAppSelector } from "hooks/reducer";

interface Props {
  type: 'new' | 'edit'
}

const NewBill = (props: Props) => {
  const { type } = props;
  const [visible, open, close] = useModalHooks(false);
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { bills } = useAppSelector(state => state.billStore)
  return (
    <>
      <Button onClick={open}>{type === 'new' ? '新建账单' : '编辑账单'}</Button>
      {visible && <NewBillModal
        visible={visible}
        handleOk={close}
        handleCancel={close}
        type={type}
        bill={bills[id]}
      />}
    </>
  );
};

export default NewBill;
