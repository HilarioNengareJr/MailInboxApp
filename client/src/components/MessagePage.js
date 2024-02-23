import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MessagePage = () => {
    const { messageId } = useParams();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetch(`/api/message/${messageId}`)
            .then(response => response.json())
            .then(data => {
                setMessage(data);
            })
            .catch(error => console.log(`Error occurred fetching message: ${error}`));
    }, [messageId]);

    if (!message) {
        return <div>Just a second ..</div>;
    }

    return (
        <main className='container'>
            <section className='section'>
                <div className='div'>
                    <h3 className='h3'>Subject</h3>
                    <legend>{message.subject}</legend>
                    <h3 className='h3 border-bottom'>Content</h3>
                    <p>{message.content}</p>
                </div>
            </section>
        </main>
    );
}

export default MessagePage;
