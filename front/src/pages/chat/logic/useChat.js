import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { socket } from '../../../socket'
import dayjs from 'dayjs'
import { AppAuthContext } from '../../../core/contexts/AppAuthProvider'
import { AppNotifContext } from '../../../core/contexts/AppNotifProvider'

const useChat = (friend, user) => {

    const [messages, setmessages] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [error, seterror] = useState()
    const [msgLoading, setmsgLoading] = useState(false)
    const [msgError, setmsgError] = useState()
    const [msg, setMsg] = useState('');


    const { setNotifList, setNotifRead } = useContext(AppNotifContext)

    const getMessages = async () => {
        try {
            setisLoading(true)
            seterror()

            const result = await axios.get('http://localhost:5005/message', { params: { user: user.id, friend } });
            if (result.data ) {
                console.log('first',result)
                setmessages(result.data.data)
            } else setmessages([])
        } catch (error) {
            if (error.response?.data.statusCode == 7004) {
                setmessages([])
            } else seterror('An error has occured')
        } finally {
            setisLoading(false)
        }
    };

    const sendMessage = async () => {
        try {
            setmsgLoading(true)
            setmsgError()

            const result = await axios.post('http://localhost:5005/message', { sender: user.id, receiver: friend, content: msg, date: dayjs() });
            if (result.data) {
                socket.emit('send_message', { dest: friend, msg: result.data.data });
                setmessages(previous => [result.data.data, ...previous]);
            }
        } catch (error) {
            console.log(error);
            setmsgError("An error has occured")
        } finally {
            setmsgLoading(false)
        }
    }

    const handleSend = (e) => {
        e.preventDefault();
        msg && sendMessage();
        setMsg('')

    }
    useEffect(() => {
        getMessages()
        setNotifRead(friend)
    }, [friend])

    useEffect(() => {

        // Socket receive
        function onMessageRec(data) {
            if (data.sender == friend) {
                setmessages(previous => [data, ...previous]);
            }
            else {
                setNotifList(data.sender)
            }
        }

        socket.on('receive_message', onMessageRec);

        return () => {
            socket.off('receive_message', onMessageRec);
        }
    }, [friend])

    return {
        messages,
        isLoading,
        error,
        handleSend,
        setMsg,
        msgLoading,
        msgError,
        user

    }
}

export default useChat