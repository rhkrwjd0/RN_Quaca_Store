import React, {useState} from 'react';
import UrlContext from './UrlContext';

const UrlProvider = ({children}) => {
  const setUrl = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        url: props.url,
      };
    });
  };

  const initialState = {
    url: '',
    setUrl,
  };

  const [text, setText] = useState(initialState);
  return <UrlContext.Provider value={text}>{children}</UrlContext.Provider>;
};

export default UrlProvider;
