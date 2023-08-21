import React, { useEffect, useState } from 'react'
import { socket } from '../../../socket'

const useCall = (friend, user) => {

  const callWindow = window

  const handleCall = () => {

    socket.emit('Request_Call',friend);
    callWindow.open(`/call/${friend}`, '', 'width=700,height=650');
  }

  function onAcceptedCall(data) {
    setaccepted(true)
    alert('accepted')
  }
  function onRejectedCall(data) {
    callWindow.alert('Rejected')
    setrejected(true)
  }
  function onOfflineCall(data) {
    alert('Offline')
    setoffline(true)
  }

  const [rejected, setrejected] = useState(false)
  const [accepted, setaccepted] = useState(false)
  const [offline, setoffline] = useState(false)

  useEffect(() => {
   

    socket.on('Call_Accepted', onAcceptedCall);
    socket.on('Call_Rejected', onRejectedCall);
    socket.on('Call_Offline', onOfflineCall);

    return () => {
      socket.off('Call_Accepted', onAcceptedCall);
      socket.off('Call_Rejected', onRejectedCall);
      socket.off('Call_Offline', onOfflineCall);
    }
  }, [friend])

  return {
    handleCall,
  }
}

export default useCall