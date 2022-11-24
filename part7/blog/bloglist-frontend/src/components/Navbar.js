import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import { useSelector } from 'react-redux'


const Navbar = () => {
  const user = useSelector(state => state.user)

  const padding = {
    paddingRight: 5,
    marginRight: 10
  }

  const logout = () => {
    window.location.href = 'http://localhost:3000/'
    window.localStorage.removeItem('loggedUser')
  }


  return (
    <div style={{ display:'flex',justifyContent:'space-between', backgroundColor:'lightgray', padding:'10px' }}>
      <div>
        <Link to='/' style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link>
      </div>
      <div>
        {user
          ?
          <span>Hello <span style={{ fontWeight:'600',marginRight:'15px', fontStyle:'italic' }}>{user}</span></span>
          :
          <LoginForm />
        }
        <button className="button-50" onClick={logout}>logout</button>
      </div>
    </div>

  )
}

export default Navbar