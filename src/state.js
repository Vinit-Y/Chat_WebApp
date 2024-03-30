import { MESSAGES } from './constants';

const state = {
  chats: {},
  isLoggedIn: false,
  isLoginPending: true,
  isChatsLoadingPending: false,
  username: '',
  error: '',
};

export function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.chats = {};
  state.error = '';
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.chats = {};
  state.error = '';
}

export function waitOnChats() {
  state.chats = {};
  state.isChatsLoadingPending = true;
  state.error = '';
}

export function setChats(chats) {
  state.chats = chats;
  state.isChatsLoadingPending = false;
  state.error = '';
}

export function addToChat({ id, chat }) {
  state.chats[id] = chat;
  state.error = '';
}

export function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.isLoginPending = false;
  state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;

