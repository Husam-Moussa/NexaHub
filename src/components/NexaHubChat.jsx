const handleSendMessage = async () => {
  if (!message.trim()) return;

  const newMessage = {
    id: Date.now(),
    text: message,
    sender: 'user',
    timestamp: new Date().toISOString(),
  };

  setMessages(prev => [...prev, newMessage]);
  setMessage('');
  setIsLoading(true);

  try {
    const response = await chatAPI.sendMessage(message, messages);
    const aiResponse = {
      id: Date.now() + 1,
      text: response.message,
      sender: 'ai',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, aiResponse]);
  } catch (error) {
    console.error('Error sending message:', error);
    setError('Failed to send message. Please try again.');
  } finally {
    setIsLoading(false);
  }
}; 