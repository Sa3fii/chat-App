import React, { useContext } from 'react'
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap'
import ChatContent from './components/ChatContent/ChatContent'
import useChat from './logic/useChat'
import { useLocation } from 'react-router-dom'
import { AppAuthContext } from '../../core/contexts/AppAuthProvider'
import useCall from './logic/useCall'
import ReceiveCall from './components/Call/ReceiveCall/ReceiveCall'


const Chat = () => {
    const { state } = useLocation();
    const { userData: user } = useContext(AppAuthContext)
    const { isLoading, error, messages, handleSend, setMsg, msgLoading, msgError, msg } = useChat(state.id, user)
    const { handleCall } = useCall(state.id, user)

    return (
        <div className='viewpor'>

            

            <div className='mx-2 p-0  chat-head d-flex flex-column justify-content-between'>
                <div className='d-flex  align-items-center justify-content-between'>
                    <h3 className='p-3 m-0'>{state.name}</h3>
                    <div onClick={handleCall} className='button rounded-circle p-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#3F72AF" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>
                    </div>
                </div>

                <hr></hr>
            </div>

            <div className=' mx-5   chat-body  overflow-auto d-flex flex-column-reverse' >
                <ChatContent user={user} friend={state} isLoading={isLoading} error={error} messages={messages} />
            </div>


            <div className='mx-2 p-1   chat-head d-flex '>
                <div className='w-100 '>
                    <Form className=' d-flex justify-content-center align-items-center gap-5 h-100' onSubmit={handleSend}>
                        <Form.Group className="w-75" controlId="sendMsg">
                            <Form.Control type="text" as='textarea' placeholder="Send a message" onChange={(e) => setMsg(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" size="lg" disabled={msgLoading} className='w-15' type="submit">
                            Send Message
                        </Button>

                    </Form>
                </div>

            </div>

        </div>
    )
}

export default Chat