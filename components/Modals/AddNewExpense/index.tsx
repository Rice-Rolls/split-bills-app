import {
  Button,
  Modal,
} from "antd";
import styles from "./index.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import useModalHooks from "hooks/useModal";
import { useForm } from "antd/lib/form/Form";
import { Bill, Expense } from "types/";
import { useState } from "react";
import { useAppDispatch } from "hooks/reducer";
import { updateExpense } from "reducer/expense";
import { expenseTypeList } from "constants/index";
import ExpenseForm from "./ExpenseModal";
import ExpenseModal from "./ExpenseModal";

interface Props {
  id: string;
  bill: Bill;
}

const AddNewExpense = (props: Props) => {
  const { id, bill } = props;
  const [visible, open, close] = useModalHooks(false);
  const [form] = useForm<Expense>();

  const addNewExpense = () => {
    open();
  };

  return (
    <>
      <Button
        onClick={addNewExpense}
        className={styles.addNewExpense}
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        size={"large"}
      />
      <ExpenseModal form={form} visible={visible} open={open} close={close} id={id} bill={bill} />
    </>
  );
};

export default AddNewExpense;
