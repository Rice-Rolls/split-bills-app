import { useState } from "react";

const useModalHooks = (initialState: boolean): [boolean, () => void, () => void] => {
  const [visible, setVisible] = useState(initialState)
  const open = () => {
    setVisible(true);
  }
  const close = () => {
    setVisible(false);
  }

  return [visible, open, close]
}

export default useModalHooks;