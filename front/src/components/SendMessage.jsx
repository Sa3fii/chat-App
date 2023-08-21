import React, { useState } from 'react';
import { socket } from '../socket';


export function SendMessage() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(500).emit('send_message', value, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue({
        sender : 'saafi',
        receiver :'facha',
        content : e.target.value,
        time :'63'
        }) } />

      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
  );
}