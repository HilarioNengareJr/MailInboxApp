const { User, Message, syncDatabase } = require('./db');


const preDefinedUserData = async () => {
    try {

        await syncDatabase();

        // Creating simulating user
        const dummyUser = await User.create({ userName: 'Jim', });

        // Populating Message model
        await Message.bulkCreate([
            {
                userId: dummyUser.id,
                subject: 'Hi Again',
                content: 'Just wanted to check on you.',
                isRead: false,
            },
            {
                userId: dummyUser.id,
                subject: 'Hi Friend',
                content: 'Just wanted to let you know I\'m good.',
                isRead: false,
            },
            {
                userId: dummyUser.id,
                subject: 'Me Again',
                content: 'How are you?',
                isRead: false,
            },
            {
                userId: dummyUser.id,
                subject: 'Message 1',
                content: 'Hello my friend, how is life treating you',
                isRead: false,
            },
            {
                userId: dummyUser.id,
                subject: 'Me Again',
                content: 'How are you? Wanted to check on how things are doing.',
                isRead: false,
            },
            {
                userId: dummyUser.id,
                subject: 'Liverpool won',
                content: 'Bro, our soccer team won the UEFA champions league!!!!',
                isRead: false,
            },
            {
                userId: dummyUser.id,
                subject: 'You Received A Job Offer!',
                content: 'Just wanted to let you know that you will be joining out team at MBL Hightech. Congrats!!',
                isRead: false,
            },
            {
                userId: dummyUser.id,
                subject: 'Take out the chicken',
                content: 'Hey I am running late can you take out the chicken from the freezer.',
                isRead: false,
            },
            {
                userId: dummyUser.id,
                subject: 'Movie Night.',
                content: 'You are hosting movie night, make pop corn and get diet cokes!!',
                isRead: false,
            },
            {
                userId: dummyUser.id,
                subject: 'Backlogs',
                content: 'Can you give an update on backlog progress please, and thanks!',
                isRead: false,
            }]
        );

        console.log('Dummy user and messages created successfully!');
    } catch (error) {
        console.error('Error creating dummy data:', error.message);
    }
};

module.exports = { preDefinedUserData };