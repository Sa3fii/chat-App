import React, { useContext, useEffect } from 'react'
import { Alert, Badge, Button, Container, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import useFriendlist from './logic/useFriendlist'
import { AppAuthContext } from '../../core/contexts/AppAuthProvider'
import { AppNotifContext } from '../../core/contexts/AppNotifProvider'



const Friendlist = ({ onlineList }) => {

    const { userData: user } = useContext(AppAuthContext);
    const { notifList } = useContext(AppNotifContext);

    const { data, isLoading, error } = useFriendlist(onlineList);
    const navigate = useNavigate();

    const BadgeCount = ({ id }) => {
        let idf
        if (notifList && notifList.length !== 0) {
            idf = notifList.findIndex((elmnt) => elmnt.id == id)
            if (idf !== -1) return <div>{notifList[idf]?.count}</div>
        }
        return null
    }

    const OnlineBadge = ({ id }) => {
        useEffect(() => {
        }, [id]);
        
        const onlineUserIndex = onlineList.findIndex((user) => user.id === id);

        if (onlineUserIndex !== -1) return (
            <span className="position-absolute top-50 start-100 translate-middle p-2 bg-success border border-light rounded-circle ">
                <span className="visually-hidden"></span>
            </span>
        )
        return null;

    }

    const ListContent = () => {
        if (isLoading && !error) return <div className='d-flex justify-content-center align-items-center w-100 h-75'><Spinner /></div>
        if (!isLoading && error) return <div className='d-flex justify-content-center align-items-center w-100 h-75'><Alert variant='danger' > {error}</Alert></div>
        if (!isLoading && !error && data.length === 0) return <div className='d-flex justify-content-center align-items-center w-100 h-75'><h6 className='text-black-50'>No Friends</h6></div>
        if (data && data.length !== 0) return data.map((friend, idx) => {
            if (friend.id != user.id) {
                return <Link key={idx} className='text-decoration-none text-light ' to={`chat/${friend.id}`} state={{ ...friend }} >
                    <div className='ps-4 pe-4 py-2 my-1 fs-5 firend-list-element  d-flex justify-content-between'>
                        <div className='position-relative pe-3'>{friend.name}
                            <OnlineBadge id={friend.id} />
                        </div>
                        <Badge bg="primary"><BadgeCount id={friend.id} /></Badge>

                    </div>
                </Link>
            }
        })
    }

    return (
        <Container className=' d-flex viewpor flex-column friend-list justify-content-between p-0 m-0'>
            <div className='chat-head'>
                <h3 className='p-3 m-0 text-white' > Friend List</h3>
                <hr className='text-white'></hr>
            </div>
            <div className='chat-body'>
                <ListContent />
            </div>
            <div className='chat-head px-2 py-3 d-flex align-items-center'>
                <div onClick={() => navigate('/signout')} className=' w-100  rounded-3 button signout d-flex justify-content-between align-items-center p-3 py-2'>
                    <div className='button text'> Sign Out</div>
                    <div className='h-100'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#3F72AF" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                    </div>
                </div>
            </div>

        </Container>

    )
}

export default Friendlist