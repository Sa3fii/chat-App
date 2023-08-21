import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { socket } from '../../../socket'

const useFriendlist = (onlineList) => {



    const [data, setdata] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [error, seterror] = useState()

    const getFriends = async () => {
        try {
            setisLoading(true)
            seterror()

            const result = await axios.get('http://localhost:5005/user');
            if (result.data) {
                setdata(result.data.data)
            }
        } catch (error) {
            console.log('error in get message', error.response?.data)
            console.log(error)
            seterror('an error has occured')
        } finally {
            setisLoading(false)
        }
    }


    useEffect(() => {
        getFriends()

    }, [])



   
    return {
        data,
        isLoading,
        error,
    }
}

export default useFriendlist