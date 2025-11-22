const END_POINT = '/api';

export const createMessage = async (messageData) => {
    console.log('MessageService: Sending message', messageData);
    const res = await fetch(`${END_POINT}/messages`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
    });
    
    if (res.status < 200 || res.status >= 300) {
      return { hasError: true, message: 'A problem occurred sending the message. Please try again.' };
    }
    
    
    const data = await res.json();
    return { hasError: false, data };
    }


export const fetchMessages = async (userId, token) => {
    console.log('MessageService: Fetching messages for user', userId);
    const res = await fetch(`${END_POINT}/messages`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
    
    if (res.status < 200 || res.status >= 300) {
      return { hasError: true, message: 'A problem occurred fetching messages. Please try again.' };
    }
    
    const data = await res.json();
    return data;
}

