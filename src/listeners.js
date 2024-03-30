import {
  fetchLogin,
  fetchLogout,
  fetchChats,
  fetchAddToChats,
} from './services';
import {
  waitOnChats,
  waitOnLogin,
  setChats,
  setError,
  login,
  logout,
  addToChat,
} from './state';
import { render, renderChats } from './render';

export function addAbilityToLogin({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('login__form')) {
      return;
    }
    e.preventDefault();

    const username = appEl.querySelector('.login__username').value;
    waitOnLogin();
    render({ state, appEl });
    fetchLogin(username)
      .then(chats => {
        login(username);
        setChats(chats);
        render({ state, appEl });
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        render({ state, appEl });
      });

  });
}

export function addAbilityToLogout({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('controls__logout')) {
      return;
    }
    logout();
    render({ state, appEl });
    fetchLogout()
      .catch(err => {
        render({ state, appEl });
      });
  });
}

export function addAbilityToRefresh({ state, appEl }) {
  function refreshData() {
    if (state.isLoggedIn) {
      waitOnChats();
      fetchChats()
        .then(chats => {
          setChats(chats);
          renderChats({ state, appEl });
        })
        .catch(err => {
          setError(err?.error || 'ERROR');
          render({ state, appEl });
        });
    }
  }

  function startRefreshing() {
    refreshData();
    setInterval(refreshData, 2000);
  }
  startRefreshing();
}


export function addAbilityToAddToChats({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('add__form')) {
      return;
    }
    const message = appEl.querySelector('.add__message').value;
    fetchAddToChats(message)
      .then(chat => {
        addToChat({ id: chat.id, chat });
        render({ state, appEl });
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        render({ state, appEl });
      })
  });
}

