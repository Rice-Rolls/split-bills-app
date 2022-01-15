import {
  Button,
  Modal,
} from "antd";
import styles from "./index.module.scss";
import useModalHooks from "hooks/useModal";
import { useForm } from "antd/lib/form/Form";
import GetBillModal from './GetBillModal'
import { useRouter } from "next/router";
import { useAppSelector } from "hooks/reducer";

interface Props {
  type?: 'new' | 'edit'
}

const GetBill = (props: Props) => {
  const { type } = props;
  const [visible, open, close] = useModalHooks(false);
  const router = useRouter()
  return (
    <>
      <Button onClick={open} type='primary' className={styles.billButton}>计算账单</Button>
      {visible && <GetBillModal
        visible={visible}
        open={open}
        close={close}
      />}
    </>
  );
};

export default GetBill;