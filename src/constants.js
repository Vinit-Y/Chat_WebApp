export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message',
  MESSAGE_MISSING: 'noSuchId', 
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  [CLIENT.NO_SESSION]: 'No Session Found. Kindly Login.',
  [SERVER.AUTH_MISSING]: 'No User found. Kindly Login once agin.',
  [SERVER.REQUIRED_USERNAME] : 'Please, Enter Username!',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
  [SERVER.REQUIRED_MESSAGE]: 'Please enter the message to send',
  default: 'Something went wrong.  Please try again',
};
