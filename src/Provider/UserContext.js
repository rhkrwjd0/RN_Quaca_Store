import {createContext} from 'react';

const UserContext = createContext({
  user: '',
  setUser: () => {},
  location: '',
  setLocation: () => {},
});

export default UserContext;
