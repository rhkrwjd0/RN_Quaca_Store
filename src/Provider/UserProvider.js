import React, {useState} from 'react';
import UserContext from './UserContext';

const UserProvider = ({children}) => {
  const setUser = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        user: props.user,
      };
    });
  };
  const setLocation = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        location: props.location,
      };
    });
  };

  const initialState = {
    user: '',
    setUser,
    location: '',
    setLocation,
  };

  const [text, setText] = useState(initialState);
  return <UserContext.Provider value={text}>{children}</UserContext.Provider>;
};

export default UserProvider;
