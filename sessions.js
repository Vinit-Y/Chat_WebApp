const uuid = require('uuid').v4;

const sessions = {};
const messages = [];

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
};

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function getSessionUserList() {
  const allUsernames = Object.values(sessions).map(session => session.username);
  const uniqueUsernames = [];
  allUsernames.forEach(username => {
    if (!uniqueUsernames.includes(username)) {
      uniqueUsernames.push(username);
    }
  });
  return uniqueUsernames;
}

function getAllMessages() {
  return messages;
}

function addMessageToList(username, message) {
  messages.push({ username, message });
}

function deleteSession(sid) {
  delete sessions[sid];
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getSessionUserList,
  getAllMessages,
  addMessageToList
};
