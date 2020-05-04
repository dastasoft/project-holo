import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

function useActionSocket(actions) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    console.log('[socket established]');
    setSocket(socketIOClient(process.env.WEBSOCKET));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('action', data => {
        console.log('[action]', data.action);
        actions[data.action]();
      });
    }
  }, [socket]);

  const broadcastRoomJoin = roomName => {
    console.log('[joining room]', roomName);
    if (socket) socket.emit('join', roomName);
  };

  return { socket, broadcastRoomJoin };
}

export default useActionSocket;
