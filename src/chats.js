import { SERVER, CLIENT } from './constants';
import state, {
  login,
  logout,
  waitOnChats,
  setChats,
  setError,
} from './state';
import {
  fetchChats,
  fetchSession,
} from './services';
import { render, renderChats} from './render';
import {
  addAbilityToLogin,
  addAbilityToLogout,
  addAbilityToRefresh,
  addAbilityToAddToChats,
} from './listeners';

const appEl = document.querySelector('#app');
render({ state, appEl });
addAbilityToLogin({ state, appEl });
addAbilityToLogout({ state, appEl });
addAbilityToRefresh({ state, appEl });
addAbilityToAddToChats({ state, appEl });
checkForSession();

function checkForSession() {
  fetchSession()
    .then(session => {
      login(session.username);
      render({ state, appEl });
      return fetchChats();
    })
    .catch(err => {
      if (err?.error === SERVER.AUTH_MISSING) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err);
    })
    .then(chats => {
      setChats(chats);
      render({ state, appEl });
    })
    .catch(err => {
      if (err?.error == CLIENT.NO_SESSION) {
        logout();
        render({ state, appEl });
        return;
      }
      setError(err?.error || 'ERROR');
      render({ state, appEl });
    });
}

