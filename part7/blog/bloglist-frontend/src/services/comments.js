import axios from 'axios';
const baseUrl = '/api/comments';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const addComment = async comment => {
  //console.log(token);
  let config = {
    headers: { Authorization: token },
  };
  let response = await axios.post(baseUrl, comment, config);
  return response.data;
};

export default { addComment, setToken };
