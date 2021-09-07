import React, {useState} from 'react';
import { Modal, Button } from 'antd';

const GlobalModalContext = React.createContext({
  setModalInfo: () => {},
})
export { GlobalModalContext };
const GlobalModalContextContainer = (props) => {
  const [modal, setModal] = useState({
    show: false,
    type: 'IMG', // IMG || CONTENT
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
    <GlobalModalContext.Provider value={{
      modal,
      setModalInfo,
    }}>
      <Modal title="Basic Modal" className="modal-90w global-modal-container" visible={modal.show} onOk={onHide} onCancel={onHide}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      {props.children}
    </GlobalModalContext.Provider>
  );
}
export default GlobalModalContextContainer