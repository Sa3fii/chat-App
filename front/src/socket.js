import { useContext } from 'react';
import { io } from 'socket.io-client';
import { AppAuthContext } from './core/contexts/AppAuthProvider';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:2002';


export const socket = io(URL, { autoConnect :false });


