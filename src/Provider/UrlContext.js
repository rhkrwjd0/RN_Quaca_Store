import {createContext} from 'react';

const UrlContext = createContext({
  url: '',
  setUrl: () => {},
});

export default UrlContext;
