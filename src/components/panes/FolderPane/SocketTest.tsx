import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket: any = undefined;
if (window.location.href.includes('124.223.27.177')) {
  socket = io('ws://124.223.27.177:3001');
} else {
  socket = io('ws://127.0.0.1:3001');
}

// console.log()
function SocketTest() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState<any>([]);

  useEffect(() => {
    sendPing();
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('connect');
      // 进来直接加入
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('onlineUsers', (r: any) => {
      console.log('sss');
      setLastPong(r.users);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('onlineUsers');
    };
  }, []);

  const sendPing = () => {
    socket.emit('joinRoom', { username: localStorage.getItem('token') });
  };
  return (
    <div
      css={css`
        display: none;
      `}
    >
      <p>Connected: {'' + isConnected}</p>
      {/*<p>onlineUsers: { JSON.stringify(lastPong) }</p>*/}

      <div>
        {lastPong.map((l: any) => {
          return <div key={l.username}>{l.username}</div>;
        })}
      </div>
      <button onClick={sendPing}>登陆</button>
    </div>
  );
}

export default SocketTest;
