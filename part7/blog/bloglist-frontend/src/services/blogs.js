import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newBlog => {
  //console.log(token);
  let config = {
    headers: { Authorization: token },
  };
  let response = await axios.post(baseUrl, newBlog, config);
  return response.data;
  //console.log(config);
};

const remove = async id => {
  let config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const updateLikes = async id => {
  let config = {
    headers: { Authorization: token },
  };
  let response = await axios.put(`${baseUrl}/${id}`, 'sddas', config);
  return response.data;
};

export default { getAll, setToken, create, remove, updateLikes };
