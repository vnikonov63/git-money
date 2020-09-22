import { REGISTRATION_STARTED } from '../../action-types.js';

export default (firstName, lastName, email, login, password , repPassword) => ({
  type: REGISTRATION_STARTED,
  payload: {
    firstName,
    lastName,
    email,
    login,
    password,
    repPassword,
  },
});
