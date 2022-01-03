import { Button, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { expenseTypeList } from "constants/index";
import { useAppDispatch } from "hooks/reducer";
import useModalHooks from "hooks/useModal";
import { useEffect, useState } from "react";
import bill from "reducer/bill";
import { Bill, Expense } from "types/index";
import ExpenseModal from "../AddNewExpense/ExpenseModal";
import ExpenseForm from "../AddNewExpense/ExpenseModal";

interface Props {
  id: string
  expense: Expense
  bill: Bill
}

const ExpenseInfo = (props: Props) => {
  const { expense, bill, id } = props
  const [visible, open, close] = useModalHooks(false);
  const [form] = useForm<Expense>();
  const dispatch = useAppDispatch();

  const [expenseType, setExpenseType] = useState(expenseTypeList[0]);

  useEffect(() => {
    form.setFieldsValue(expense)
    const expenseType = expenseTypeList.find((item => item.type === expense.type))
    if(expenseType){
      setExpenseType(expenseType)
    }
  }, [expense])

  return (<>
    <Button type='link' onClick={() => open()}>详情</Button>
    <ExpenseModal expense={expense} visible={visible} open={open} close={close} id={id} bill={bill} />
  </>)
}

export default ExpenseInfo