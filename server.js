const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const chats = require('./chats');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

// Sessions
app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.status(200).json({ username });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if (!existingUserData) {
    users.addUserData(username, chats.makeChatsList());
  }

  res.cookie('sid', sid);
  const data = users.getUserData(username).getChats();
  const userList = sessions.getSessionUserList();
  const allMessages = sessions.getAllMessages();
  res.status(201).json({ data, userList, allMessages });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    sessions.deleteSession(sid);
  }
  res.status(204).json({ username });
});

// Chats
app.get('/api/v1/chats', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const data = users.getUserData(username).getChats();
  const userList = sessions.getSessionUserList();
  const allMessages = sessions.getAllMessages();
  res.status(200).json({ data, userList, allMessages });
});

app.post('/api/v1/chats', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { message } = req.body;
  if (!message) {
    res.status(400).json({ error: 'required-message' });
    return;
  }
  const chatsList = users.getUserData(username);
  const id = chatsList.addToChat(message);
  sessions.addMessageToList(username, message);
  res.status(201).json(chatsList.getChat(id));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

