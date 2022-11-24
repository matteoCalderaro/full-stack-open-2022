import { useEffect } from 'react';
import blogService from './services/blogs';
import commentService from './services/comments';
import Notifications from './components/Notifications';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import { useDispatch } from 'react-redux';
import { setUser } from './reducers/loginReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import Users from './components/Users';
import User from './components/User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  //in case a token is expired it clears the localstorage
  // useEffect(()=> {
  //   async function matteo() {
  //     let userParsed = 0
  //     let userInLocalStorage = window.localStorage.getItem('loggedUser')
  //     if(userInLocalStorage) {
  //       userParsed = JSON.parse(userInLocalStorage)
  //       try {
  //       await axios.post('/api/token','dada', {
  //         headers: { "Authorization": `bearer ${userParsed.token}` }
  //       })

  //       } catch (error) {
  //         window.localStorage.clear()
  //       }
  //     }
  //   }
  //   matteo()
  // },[])

  // LOCAL STORAGE GET TOKEN
  useEffect(() => {
    let userInLocalStorage = window.localStorage.getItem('loggedUser');
    if (userInLocalStorage) {
      let userParsed = JSON.parse(userInLocalStorage);
      dispatch(setUser(userParsed.name));
      blogService.setToken(userParsed.token);
      commentService.setToken(userParsed.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  if (user === null) return <LoginForm />;

  return (
    <Router>
      <div className="container">
        <Navbar />

        <Notifications />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
