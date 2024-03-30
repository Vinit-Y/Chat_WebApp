const uuid = require('uuid').v4;

function makeChatsList() {
  const id1 = uuid();
  const id2 = uuid();

  const chatsList = {};
  const chats = {
    [id1]: {
      id: id1,
      message: 'Hi',
    },
    [id2]: {
      id: id2,
      message: 'Hello',
    },
  };

  chatsList.contains = function contains(id) {
    return !!chats[id];
  };

  chatsList.getChats = function getChats() {
    return chats;
  };

  chatsList.addToChat = function addToChat(message) {
    const id = uuid();
    chats[id] = {
      id,
      message
    };
    return id;
  };

  chatsList.getChat = function getChat(id) {
    return chats[id];
  };

  return chatsList;
};

module.exports = {
  makeChatsList,
};
