// Establish connection with the Socket.io server
const socket = io();

// Grab DOM elements for the chat interface
const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

/**
 * Appends a new message to the chat window.
 * The message is wrapped in a container with class "message"
 * and includes a child element with the sender's class ("user" or "bot").
 *
 * @param {string} message - The text of the message to display.
 * @param {string} sender - The sender type ("user" or "bot") for styling.
 */
function appendMessage(message, sender) {
  // Create the message container with the "message" class.
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message');

  // Create the inner element that will hold the actual text.
  const messageContent = document.createElement('div');
  messageContent.classList.add(sender); // This will be either "user" or "bot"
  messageContent.textContent = message;

  // Append the message content to the container.
  messageContainer.appendChild(messageContent);

  // Append the complete message container to the chat window.
  chatWindow.appendChild(messageContainer);

  // Auto-scroll to the bottom of the chat window.
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/**
 * Sends the user's message to the backend and displays it in the chat window.
 */
function sendMessage() {
  const message = chatInput.value.trim();
  if (message === '') {
    return; // Do not send empty messages.
  }
  
  // Display the user's message in the chat window.
  appendMessage(`You: ${message}`, 'user');

  // Send the message to the backend via Socket.io.
  socket.emit('chat message', message);

  // Clear the input field for the next message.
  chatInput.value = '';
}

// Attach an event listener to the send button.
sendBtn.addEventListener('click', sendMessage);

// Also allow sending messages by pressing the Enter key in the input field.
chatInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Listen for messages coming from the backend (e.g., Dialogflow responses)
socket.on('chat message', (msg) => {
  // Append the bot's response to the chat window.
  appendMessage(` ${msg}`, 'bot');
});
