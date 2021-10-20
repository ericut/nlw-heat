import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { api } from '../../services/api';

import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg';

type IMessage = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const messagesQueue: IMessage[] = [];

const socket = io('http://localhost:4000');
socket.on('new_message', (newMessage: IMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) => [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean));
        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get<IMessage[]>('messages/last').then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />
      <ul className={styles.messageList}>
        {messages.map((message) => {
          let newKey = message.id.replace(/-/g, '');
          return (
            <li key={newKey} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
