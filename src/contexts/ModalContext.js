import React, {useState} from 'react';
import { Modal, Button } from 'antd';

const ModalContext = React.createContext({
  setModalInfo: () => {},
  onHide: () => {}
})
export { ModalContext };
const ModalContextContainer = (props) => {
  const [modal, setModal] = useState({
    show: false,
    step: 0,
    type: 'CONTENT', // IMG || CONTENT
    headerText: '',
    bodyText: '',
    img: '',
  })
  const setModalInfo = (params) => {
    console.log({ ...modal, ...params })
    setModal({ ...modal, ...params, show: true })
  }
  const onHide = () => {
    setModal({
      show: false,
      step: 0,
      type: 'basic',
      headerText: '',
      bodyText: '',
      img: '',
    })
  }
  return (
    <ModalContext.Provider value={{
      modal,
      setModalInfo,
      onHide
    }}>
      {props.children}
    </ModalContext.Provider>
  );
}
export default ModalContextContainer