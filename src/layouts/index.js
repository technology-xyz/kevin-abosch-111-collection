/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useRef } from 'react';
import Footer from './Footer';
import { PageLayoutContainer } from './style';
import Topbar from './Topbar';
import {AnnounceContext} from "contexts/AnnounceContextContainer";
import {ScrollContext} from "contexts/ScrollContextContainer";
import { Scrollbars } from 'react-custom-scrollbars';
import MobileTickersArea from 'components/Sections/MobileTickersArea';

const PageLayout = ({ children }) => {
  const { message, showKOIInfo, setShowKOIInfo } = useContext(AnnounceContext)
  const { scrollTop, setScrollTop, setScrollUp,  setScrollFrame } = useContext(ScrollContext)
  const childRef = useRef(null)
  const onScrollStart = () => {
    if (childRef) { // need to pass in a ref from the child component
      const rt = childRef.current.getValues();
      if(rt.scrollTop > scrollTop){
        setScrollUp(true)
      }else{
        setScrollUp(false)
      }
    }
  };
  const handleUpdate = () => {
    if (childRef) {
      const vt = childRef.current.getValues();
      // console.log(vt.scrollTop, scrollTop)
      // if(Math.abs(vt.scrollTop - scrollTop)> 5)
        setScrollTop(vt.scrollTop)
    }
  };
  const handleScrollFrame = (values) => {
    if (childRef) {
      setScrollFrame(values)
      // console.log(values)
      // const { clientHeight, scrollHeight } = values;
      // const deltaY = scrollHeight - scrollTop - clientHeight
      // console.log("deltaY" , deltaY)
      // if(deltaY < 150 && scrollUp) {
      //   show_notification('scroll bottom')
      // }
      // if(deltaY > 150 && !scrollUp) {
      //   show_notification('no scroll bottom')
      // }
    }
  };
  return (
    <Scrollbars 
      ref={childRef}
      onScrollStart={onScrollStart}
      onUpdate={handleUpdate}
      onScrollFrame={handleScrollFrame}
    // onScroll={handleScroll}
    >

      <PageLayoutContainer>
        <Topbar />
        <div className='page-content'>
          {message && 
            <div className='announcement-area'>
              <div className='container'>
                <div className='message-area'>{message}</div>
              </div>
            </div>
          }
          {children}
        </div>
        <Footer />
        <div className={`${showKOIInfo ? 'left0' : ''} userForm`}>
          <div className={`${showKOIInfo ? 'left0' : ''} user-drawer`}>
            <MobileTickersArea onClickClose={() => setShowKOIInfo(!showKOIInfo)}/>
          </div>
        </div>
      </PageLayoutContainer>
    </Scrollbars>
  );
}

export default PageLayout;