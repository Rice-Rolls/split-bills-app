import { Button, Form, Input, Modal, Select, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useForm } from "antd/lib/form/Form";
import styles from "./index.module.scss";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Bill } from "types/";
import { useAppDispatch } from "hooks/reducer";
import { updateBill } from "reducer/bill";

interface Props {
  type?: "new" | "edit";
  bill?: Bill;
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const NewBillModal = (props: Props) => {
  const { visible, handleOk, handleCancel, type = "new", bill } = props;
  const [formValues, setFormValues] = useState<Partial<Bill>>({});
  const [form] = useForm<Bill>();
  const router = useRouter();
  const id = router.query?.id as string ?? Math.floor(Math.random() * Math.pow(10, 5)).toString()
  const dispatch = useAppDispatch();
  const onOk = () => {
    // set current formValues to localStorage
    dispatch(updateBill({ id, bill: formValues as Bill }));
    if (type === "new") {
      router.push(`/bill?id=${id}`);
    }
    handleOk();
  };
  const handleValuesChange = (changedValues: any, allValues: Bill) => {
    setFormValues(allValues);
  };

  const options = useMemo(() => {
    return formValues.participants?.map((item) => ({
      value: item?.name,
      label: item?.name,
    }));
  }, [formValues]);

  useEffect(() => {
    if (bill) {
      console.log(bill);
      form.setFieldsValue(bill);
    }
  }, [bill]);

  return (
    <Modal
      title={type === "new" ? "新建账单" : "编辑账单信息"}
      visible={visible}
      onOk={onOk}
      onCancel={handleCancel}
    >
      <Form form={form} onValuesChange={handleValuesChange}>
        <div className={styles.billName}>
          <Avatar className={styles.avatar}>
            {formValues.billName?.slice(0, 1)}
          </Avatar>
          <Form.Item
            name="billName"
            rules={[{ required: true, message: "需要填写账单名称" }]}
          >
            <Input placeholder="账单名称" />
          </Form.Item>
        </div>
        <p>参与人</p>
        <Form.List name="participants">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div className={styles.participants} key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[{ required: true, message: "请填写名称或删除" }]}
                    className={styles.participantName}
                  >
                    <Input placeholder="参与者" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加参与人
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item name="target" label="添加主要收款人">
          <Select placeholder="选择主要收款人" options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewBillModal;
