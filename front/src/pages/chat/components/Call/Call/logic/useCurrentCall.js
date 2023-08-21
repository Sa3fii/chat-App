import React, { useEffect, useState } from 'react'
import { socket } from '../../../../../../socket'

const useCurrentCall = () => {

  const [rejected, setrejected] = useState(false)
  const [accepted, setaccepted] = useState(false)
  const [offline, setoffline] = useState(false)

  useEffect(() => {
    function onAcceptedCall(data) {
      setaccepted(true)
      alert('accepted')
    }
    function onRejectedCall(data) {
      alert('Rejected')
      setrejected(true)
    }
    function onOfflineCall(data) {
      alert('Offline')
      setoffline(true)
    }

    socket.on('Call_Accepted', onAcceptedCall);
    socket.on('Call_Rejected', onRejectedCall);
    socket.on('Call_Offline', onOfflineCall);

    return () => {
      socket.off('Call_Accepted', onAcceptedCall);
      socket.off('Call_Rejected', onRejectedCall);
      socket.off('Call_Offline', onOfflineCall);
    }
  }, )

  return {
    rejected,
    accepted,
    offline
  }
}

export default useCurrentCall