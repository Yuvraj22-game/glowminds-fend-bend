HOW THIS FILE WORKS :

Express: A web framework for Node.js.
Socket.io: For real-time communication.
Dialogflow: The client library to interact with the Dialogflow API.
uuid: A library to generate unique session IDs.



Step 1. Create and Set Up a Dialogflow Agent
Sign Up / Log In:

Go to the Dialogflow Console.
Sign in with your Google account.
Create a New Agent:

Click on the gear icon next to Create Agent.
Enter a name (e.g., “GlowMindsAgent”), choose your default language and time zone.
Click Create.
Define Intents and Responses:

In the Dialogflow console, select Intents.
Create several intents that represent the types of questions your users might ask. For example:
Welcome Intent: (Dialogflow usually has a default welcome intent. Edit it as needed.)
General Mental Health Advice: Add training phrases like “I feel stressed” or “I’m anxious.”
Resources: Provide responses that include hotline numbers or resource links.
For each intent, add responses that your agent should reply with.
Test Your Agent in the Console:

Use the test console on the right-hand side to try out queries and see if the responses are as expected.
Download Service Account Credentials:

Go to the Google Cloud Console.
Select your Dialogflow project from the project list.
Navigate to IAM & Admin > Service Accounts.
Click Create Service Account.
Give it a name (e.g., “dialogflow-client”).
In the service account details, click Create Key and choose JSON.
Save the JSON file securely. You’ll use this file to authenticate your backend with Dialogflow.

Step 2. Build the Node.js Backend Server
We’ll create a Node.js server that will:

Listen for incoming messages from the frontend.
Send user messages to Dialogflow.
Return Dialogflow’s response back to the frontend.

2.1. Set Up Your Project
Initialize Your Project:

Install Required Packages:

Express for creating the server.
Socket.io for real-time communication (if you want live chat).
The Dialogflow client library.
uuid for session IDs

2.2. Create the Server File
Create a file named server.js in the project folder.

Step 3. Testing and Running Your Application

Run the Node.js Server:

node server.js (in powershell)

Open Your Browser:

Navigate to http://localhost:3000/ (or the port you specified).
Test the chat by sending messages. Your frontend will send the message to the Node.js server, which in turn sends it to Dialogflow. The Dialogflow response is then relayed back to the frontend in real time.


