// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid'); // For unique session IDs
const path = require('path');

// Initialize express and create an HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve your frontend files from a "public" folder
app.use(express.static(path.join(__dirname, 'public')));


const serviceAccountPath = path.join(__dirname, 'glowmindsagent-jmlc-92fb5cb99ac6.json');

process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountPath;

// Create a new session client
const sessionClient = new dialogflow.SessionsClient();

// Create a function to process the user message with Dialogflow
async function processUserMessage(message, sessionId) {
  // Define session path
  const sessionPath = sessionClient.projectAgentSessionPath(
    'glowmindsagent-jmlc', // Replace with your Dialogflow project ID
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US', // Adjust if needed
      },
    },
  };

  // Send request and get response from Dialogflow
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  
  // Return the fulfillment text or a fallback message if none is provided
  return result.fulfillmentText || "I didn't understand that. Can you try asking differently?";
}

// Socket.io connection for real-time communication
io.on('connection', (socket) => {
  console.log('New client connected');

  // Generate a unique session id for each client
  const sessionId = uuid.v4();

  // Listen for a message from the client
  socket.on('chat message', async (msg) => {
    try {
      // Send the user message to Dialogflow and get a response
      const responseText = await processUserMessage(msg, sessionId);
      // Emit the response back to the client
      socket.emit('chat message', responseText);
    } catch (error) {
      console.error('Error processing message: ', error);
      socket.emit('chat message', 'Sorry, there was an error processing your request.');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server on port 3000 or the port specified in your environment
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
