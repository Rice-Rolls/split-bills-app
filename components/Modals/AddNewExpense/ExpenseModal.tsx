import { Form, Dropdown, Avatar, Input, Select, Menu, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { expenseTypeList } from "constants/index";
import { useAppDispatch } from "hooks/reducer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { updateExpense } from "reducer/expense";
import { Bill, Expense, ExpenseType } from "types";
import styles from "./index.module.scss";

interface Props {
  id: string;
  bill: Bill;
  visible: boolean
  open: () => void
  close: () => void
  expense?: Expense
}

const ExpenseModal = (props: Props) => {
  const { id, bill, visible, open, close, expense } = props;
  const [form] = useForm<Expense>();
  const dispatch = useAppDispatch();

  const [expenseType, setExpenseType] = useState(expenseTypeList[0]);


  const totalValidator = async (rule: any, value: string) => {
    const formValue = form.getFieldsValue();
    const per = formValue.per;
    const total = per
      ? Object.values(per).reduce(
          (pre, current) => Number(pre) + Number(current),
          0
        )
      : 0;
    if (total !== Number(value)) {
      return Promise.reject("输入的金额不匹配");
    }
    return Promise.resolve();
  };

  const onMenuClick = (e: any) => {
    const key = e.key;
    const expenseType = expenseTypeList.find((item) => item.type === key);
    if (expenseType) {
      setExpenseType(expenseType);
    }
  };

  const onPerChange = () => {
    form.validateFields();
  };

  const onTotalChange = (e: any) => {
    const value = e.target.value;
    const participants = bill.participants;
    participants.map((item) => {
      form.setFieldsValue({
        per: {
          [item.name]: value / participants.length,
        },
      });
    });
  };

  const onConfirm = async () => {
    try {
      await form.validateFields();
      const currentExpense = form.getFieldsValue();
      dispatch(
        updateExpense({
          id,
          expense: {
            ...currentExpense,
            type: expenseType.type,
          },
          operation: expense ? 'update' : 'add'
        })
      );
      close();
    } catch (error) {}
  };

  const menu = (
    <Menu onClick={onMenuClick}>
      {expenseTypeList.map((item) => {
        return (
          <Menu.Item icon={item.icon} key={item.type}>
            {item.text}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  useEffect(() => {
    if(expense){
      form.setFieldsValue(expense)
      const expenseType = expenseTypeList.find((item => item.type === expense.type))
      if(expenseType){
        setExpenseType(expenseType)
      }
    }
  }, [expense])

  const expenseId = Math.floor(Math.random() * Math.pow(10, 5)).toString()

  return (
    <Modal
      title={expense ? "开销详情" : "添加新的开销"}
      visible={visible}
      onOk={onConfirm}
      onCancel={close}
    >
      <Form<Expense> form={form}>
        <Form.Item hidden name="id" initialValue={expenseId}>
          <Input disabled />
        </Form.Item>
        <div className={styles.expenseInfo}>
          <Dropdown overlay={menu}>
            <Avatar size={64} shape="square" icon={expenseType.icon} />
          </Dropdown>
          <div className={styles.expenseInfoForm}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "请填写金额名称" }]}
            >
              <Input placeholder="账单名称" />
            </Form.Item>
            <Form.Item
              name="total"
              rules={[
                {
                  required: true,
                  pattern: /\d+/,
                  message: "请填写正确的账单金额",
                },
                { validator: totalValidator },
              ]}
            >
              <Input placeholder="账单金额" onChange={onTotalChange} />
            </Form.Item>
          </div>
        </div>
        <Form.Item label="付款人" name="payer" required>
          <Select
            options={bill.participants.map((item) => ({
              key: item.name,
              value: item.name,
              label: item.name,
            }))}
          />
        </Form.Item>
        <Form.List name="per">
          {() => {
            return bill.participants.map((item) => (
              <Form.Item
                key={item.name}
                label={item.name}
                name={item.name}
                rules={[
                  {
                    pattern: /\d+/,
                    message: "请填写正确的账单金额",
                  },
                ]}
              >
                <Input onChange={onPerChange} type="number" />
              </Form.Item>
            ));
          }}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default ExpenseModal;
