import React, { useEffect } from 'react'
import { Alert, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap'
import { socket } from '../../../../socket'

const ChatContent = ({ messages, error, isLoading, friend, user }) => {
    // let messages = [{sender:1},{sender:1},{sender:2},{sender:1},{sender:2},{sender:1},{sender:1},{sender:2},{sender:1},{sender:1},{sender:1},]
    let lastFromFriend = false

    const tooltip = (date) => (
        <Tooltip  className='m-0 bg-white' id="tooltip">
            <div>{date}</div>
        </Tooltip>
    );

    if (isLoading && !error) return <div className='d-flex justify-content-center align-items-center w-100 h-75'><Spinner /></div>
    if (!isLoading && error) return <div className='d-flex justify-content-center align-items-center w-100 h-75'><Alert variant='danger' > {error}</Alert></div>
    if (!isLoading && !error && messages.length == 0) return <div className='d-flex justify-content-center align-items-center w-100 h-75'><h6 className='text-black-50'>Dardech baba dardech khoudh rahtek</h6></div>
    if (messages && messages.length !== 0) return (
        messages.map((message, idx) => {
            if (message.sender == user.id) {
                return (
                    <div key={idx} className={`p-2 d-flex flex-column align-items-end `}>
                        <OverlayTrigger delay={{ show: 250, hide: 400 }} placement="left" overlay={tooltip(message.date)}>
                            <div className='border p-2 rounded-5'>
                                {message.content}
                            </div>
                        </OverlayTrigger>
                    </div>
                )
            }
            if (message.sender == friend.id) {
                if (idx != messages.length - 1) (messages[idx + 1].sender == friend.id) ? lastFromFriend = true : lastFromFriend = false

                return (
                    <div key={idx} className={`p-2 d-flex flex-column align-items-start `}>

                        {(!lastFromFriend) && <h6>{friend.name} :</h6>}
                        <OverlayTrigger delay={{ show: 100, hide: 400 }} placement="right" overlay={tooltip(message.date)}>
                            <div className='border p-2 rounded-5'>
                                {message.content}
                            </div>
                        </OverlayTrigger>
                    </div>
                )
            }

        })
    )
}

export default ChatContent