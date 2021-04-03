import axios from 'axios';

if (process.env.NODE_ENV === 'test') {
  require('./http.mocking');
}

const token = localStorage.getItem('authToken');

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// prettier-ignore
axios.defaults.headers.common = token && {
  'Authorization': `bearer ${localStorage.getItem('authToken')}`,
};

export default axios;
