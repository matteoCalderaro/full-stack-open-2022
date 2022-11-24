import Notifications from './Notifications';
import loginService from '../services/login';
import blogService from '../services/blogs';
import commentService from '../services/comments';
import { useDispatch } from 'react-redux';
import { setMessage } from '../reducers/notificationReducer';
import { setUser } from '../reducers/loginReducer';
import useField from './../hooks/useField';

const LoginForm = () => {
  // eslint-disable-next-line no-unused-vars
  const { reset: resetUsername, ...username } = useField('text');
  // eslint-disable-next-line no-unused-vars
  const { reset: resetPassword, ...password } = useField('password');

  const dispatch = useDispatch();

  const submitLogin = async event => {
    event.preventDefault();
    try {
      const user = {
        username: username.value,
        password: password.value,
      };
      let returnedValue = await loginService.login(user);
      window.localStorage.setItem('loggedUser', JSON.stringify(returnedValue));
      dispatch(setUser(returnedValue.name));
      blogService.setToken(returnedValue.token);
      commentService.setToken(returnedValue.token);
    } catch (error) {
      dispatch(setMessage(error.response.data.error, 5000));
    }
  };

  return (
    <div className="container">
      <h2>log in to application</h2>
      <Notifications />
      <form onSubmit={submitLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
export default LoginForm;
