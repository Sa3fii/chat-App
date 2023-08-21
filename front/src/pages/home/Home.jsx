import { Row, Col } from 'react-bootstrap'
import Friendlist from '../friendlist/Friendlist'
import { Outlet } from 'react-router-dom'
import './home.css'
import { socket } from '../../socket';
import { useContext, useEffect, useState } from 'react'
import { AppAuthContext } from '../../core/contexts/AppAuthProvider';
import ReceiveCall from '../chat/components/Call/ReceiveCall/ReceiveCall';
import useReceivedCall from './logic/useReceivedCall';




const Home = () => {

  const { userData } = useContext(AppAuthContext)
  const [onlineList, setOnlineList] = useState([])

  useEffect(() => {
    // Connect to the Socket.IO server
    socket.connect();
  
    // Function to emit 'register' event when connected
    function onConnect() {
      socket.emit('register', userData.id);
    }
    
    // Event listener for receiving online status updates
    const onOnlineRec = (online) => {
      setOnlineList(online);
    };
  
    // Set up event listeners
    socket.on('connect', onConnect);
    socket.on('receive_online', onOnlineRec);
  
    // Clean up event listeners when the component unmounts
    return () => {
      socket.off('connect', onConnect);
      socket.off('receive_online', onOnlineRec);
    };
  }, []);

  const {modalShow, handleRejectCall, handleAcceptCall } = useReceivedCall(userData.id)

  return (
    <Row className='me-0 '>
      <ReceiveCall modalShow={modalShow} handleRejectCall={handleRejectCall} handleAcceptCall={handleAcceptCall} />
      <Col md={2} className='pe-0 '>
        <Friendlist onlineList={onlineList} />
      </Col>
      <Col md={10} className='px-0'>
        <Outlet />
      </Col>
    </Row>
  )
}

export default Home