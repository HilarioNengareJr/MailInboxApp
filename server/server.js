const express = require('express');
const path = require('path');
const { User, Message } = require('./db');
const { preDefinedUserData } = require('./dummyData');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for json parser
app.use(express.json());

// Serving static react files 
app.use(express.static(path.join(__dirname, '../client/build')));

// Predefined user data
preDefinedUserData();

// Retrieving messages for a predefined user
app.get('/api/user/:userId/messages', async (req, res) => {
  const userId = req.params.userId;

  try {
    const userMessages = await User.findByPk(userId, {
      attributes: ['userId', 'userName'],
      include: {
        model: Message,
        attributes: ['id', 'subject', 'content', 'isRead'],
      },
    });

    if (!userMessages) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('these are user messages\n', userMessages.toJSON());

    // Sending user object as JSON
    res.json(userMessages);
  } catch (error) {
    // Handling errors
    console.error('Error fetching user messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Getting a specific message by ID
app.get('/api/message/:messageId', async (req, res) => {
  const messageId = req.params.messageId;

  try {
    // Finding the message by primary key
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Updating isRead since the message was accessed
    await message.update({ isRead: true });

    res.json(message);
  } catch (error) {
    // Handling errors
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use((req, res, next) => {
  if (/(\.ico|\.js|\.css|\.jpg|\.png|\.map)$/i.test(req.path)) {
    next();
  } else {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  }
});

// Listening on available port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
