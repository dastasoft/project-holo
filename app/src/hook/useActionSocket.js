import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

function useActionSocket(actions) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    setSocket(socketIOClient(process.env.WEBSOCKET));
  }, []);

  useEffect(() => {
    if (socket) socket.on('action', data => actions[data.action](data.value));
  }, [socket]);

  const broadcastRoomJoin = roomName => {
    if (socket && roomName) socket.emit('join', roomName.toLowerCase());
  };

  return { socket, broadcastRoomJoin };
}

export default useActionSocket;
