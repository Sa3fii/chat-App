import { useEffect, useState } from 'react'
import { socket } from '../../../socket'

const useReceivedCall = (user) => {

    const [modalShow, setmodalShow] = useState(false)
    const [caller,setCaller] = useState();

    const handleRejectCall = () => {
        socket.emit('Reject_Call',caller)
        setmodalShow(false)
    };

    const handleAcceptCall = () => {
        socket.emit('Accept_Call',caller)
        const callWindow = window.open('/call', '', 'width=700,height=650');
        setmodalShow(false)
    };
    
    useEffect(() => {

        function onCallRequest(data) {
            setCaller(data)
            setmodalShow(true)
        }

        function onCallOffline(data) {

        }

        socket.on('Call_Request', onCallRequest);
        socket.on('Call_Offline', onCallOffline);

        return () => {
            socket.off('Call_Request', onCallRequest);
            socket.off('Call_Offline', onCallOffline);
        }
    }, [])

    return {
        caller,
        modalShow,
        handleRejectCall,
        handleAcceptCall
    }
}

export default useReceivedCall