import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [messages, setMessages] = useState([]);

  // Predefined user's identifier
  const userId = 1;

  useEffect(() => {

    fetch(`/api/user/${userId}/messages`)
      .then(response => response.json())
      .then(data => {
        console.log("Data received:", data);

        if (data && data.userName && data.Messages) {
          setUserName(data.userName);
          console.log("Messages from data:", data.Messages);
          setMessages(data.Messages);

          // Filtering unread messages
          const unread = data.Messages.filter(message => !message.isRead);
          console.log("Unread messages:", unread);
          setUnreadMessages(unread);
        }
      })
      .catch(error => console.log(`Error occurred fetching user data ${error}`));
  }, []);


  return (
    <main className='container'>
      <section className='section'>
        <div className='div home-page-container text-center'>
          <h1 className='section-title'>
            Hello {userName}
          </h1>
          <p className='pt-3'> You have {unreadMessages.length} unread messages out of {messages.length} total. </p>
          <Link to={`/user/${userId}/messages`} className='btn has-before pt-3 a'>
            <span>
              View Messages
            </span>
          </Link>
        </div>

      </section>
    </main>
  );
}

export default HomePage;
