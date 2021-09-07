import React, {useState} from 'react';
import { Modal, Button } from 'antd';

const ModalContext = React.createContext({
  setModalInfo: () => {},
})
export { ModalContext };
const ModalContextContainer = (props) => {
  const [modal, setModal] = useState({
    show: false,
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
    }}>
      <Modal title={modal.headerText} className="modal-90w global-modal-container" visible={modal.show} onOk={onHide} onCancel={onHide}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      {props.children}
    </ModalContext.Provider>
  );
}
export default ModalContextContainer