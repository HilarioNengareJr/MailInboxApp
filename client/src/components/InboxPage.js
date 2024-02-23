import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InboxPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Predefined user's identifier
    const userId = 1;

    fetch(`/api/user/${userId}/messages`)
      .then(response => response.json())
      .then(data => {
        console.log("Data received:", data);

        if (data && data.Messages) {
          setMessages(data.Messages);
        }
      })
      .catch(error => console.log(`Error occurred fetching user data ${error}`));
  }, []);

  return (
    <main className='container'>
      <section className='section'>
        <div className='div'>
          <div className='text-center'>
            <h1 className='section-title'>
              MESSAGES
            </h1>
          </div>
          <div className='inbox-page-container'>
            <ul className='grid-list pt-3'>
              {messages.map(message => (
                <li key={message.id} className='border-bottom pt-2'>
                  <h2 className='section-subtitle'>{message.subject}</h2>
                  <Link to={`/message/${message.id}`} className={message.isRead ? 'a read' : 'a'}>
                    <p className='p'>{message.content}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default InboxPage;
