
import axios from 'axios';
const HOST = process.env.NEXT_PUBLIC_HOST_NAME;
export const fetchOldConversation = async (loggedInUser, friend) => 
    {
        try {
            const response = await axios.get(`https://${HOST}/api/chat/messages`,
            { withCredentials: true, headers: {} }
            );
            const allMessages = response.data.messages;



            const filteredMessages = allMessages.filter((message) => {
                return (
                    (message.sender === loggedInUser.username && message.receiver === friend.username)
                    || (message.sender === friend.username && message.receiver === loggedInUser.username)
                );
            });

            return filteredMessages;
            
        } catch (error) {
            console.error("Error catched fetching old conversation ...", error);
        }
    }