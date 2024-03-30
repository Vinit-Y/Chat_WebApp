function render({ state, appEl }) {
  const html = `
   <main class="">
     ${generateStatusHtml(state)}
     ${generateLoginHtml(state)}
     ${generateContentHtml(state)}
   </main>
  `;
  appEl.innerHTML = html;
}

function renderChats({ state, appEl }) {
  let onlineUsers = generateOnlineUsersHtml(state);
  let chats = generateChatsHtml(state);

  let updatedContent  = ``;
  updatedContent += ` 
  <div class="userListContainer">
    <h3>Online Users : </h3>
    <ul class="userList">${onlineUsers}</ul>
  </div>
  <div class="chatsContainer">
    <h3>Chats : </h3>
    <ul class="chats">${chats}</ul>
  </div>
  `;

  const newContent = appEl.querySelector('.refreshData');
  if ( newContent ){
    newContent.innerHTML = updatedContent;
  }
}

function generateStatusHtml(state) {
  return `
      <div class="status">${state.error}</div>
  `;
}

function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return `
      <div class="login__waiting">Loading user...</div>
    `
  }
  if (state.isLoggedIn) {
    return ``;
  }
  return `
      <div class="login">
        <form class="login__form" action="#/login">
          <label>
            <span>Username:</span>
            <input class="login__username" value="">
          </label>
          <button class="login__button" type="submit">Login</button>
        </form>
      </div>
  `;
}

function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return ``;
  }
  if (state.isChatsLoadingPending) {
    return `
      <div class="content">
        <div class="chats__waiting">Loading Chats...</div>
        ${generateControlsHtml(state)}
      </div>
    `;
  }
  return `
    <div class="content">
      <div class="title"><h2>Welcome ${state.username} ! </h2></div>
      <div class="refreshData">
      <div class="userListContainer">
        <h3>Online Users : </h3>
        <ul class="userList">${generateOnlineUsersHtml(state)}</ul>
      </div>
      <div class="chatsContainer">
        <h3>Chats : </h3>
        <ul class="chats">${generateChatsHtml(state)}</ul>
      </div>
      </div>
      <div class="messageInputBox">
        ${generateAddToChatHtml(state)}
      </div>
        ${generateControlsHtml(state)}
    </div>        
  `;
}

function generateControlsHtml(state) {
  return `
    <div class="controls">
        <button class="controls__logout">Logout</button>
    </div>
  `;
}

function generateChatsHtml(state) {
  if (state.chats.allMessages) {
    const chatsHtml = Object.values(state.chats.allMessages).map(chat => {
      return `
        <li class="chat">
          <label>
          <span><b>@${chat.username} => </b></span>
          <span>${chat.message}</span>
          </label>
        </li>
        `;
    }).join('') || `<p>No Messages yet, add one!</p>`;
    return chatsHtml;
  }
}

function generateOnlineUsersHtml(state) {
  if (state.chats.userList) {
    const usersListHtml = Object.values(state.chats.userList).map(user => {
      return `<li><span><b>${user}</b></span></li>`;
    }).join('');
    return usersListHtml;
  }
}

function generateAddToChatHtml(state) {
  return `
    <form class="add__form">
      <input class="add__message" placeholder="Enter message to send." required>
      <button type="submit" class="add__button">Send</button>
    </form>
  `;
}

module.exports = {
  render,
  renderChats
};
