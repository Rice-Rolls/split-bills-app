import { Button, Modal } from "antd"
import styles from './index.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import useModalHooks from "../../hooks/useModal"

const AddNewExpense = () => {
  const [visible, open, close] = useModalHooks(false)

  const addNewExpense = () => {
    open()
  }
  return (
    <>
      <Button 
        onClick={addNewExpense} 
        className={styles.addNewExpense} 
        type="primary" 
        shape="circle" 
        icon={<PlusOutlined />} size={'large'}
      />
      <Modal
        title="添加新的开销"
        visible={visible}
        onCancel={close}
      >
        
      </Modal>
    </>
  )
}

export default AddNewExpense