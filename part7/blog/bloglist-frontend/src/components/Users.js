import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Users = () => {
  const users = useSelector(state => state.users)
  console.log(users)
  const blogs = useSelector(state => state.blogs)

  const getLikes = (name) => {

    const totalLikes = blogs.filter(b => b.user.name === name).map(b => b.likes).reduce(((p,c) => p+c),0)
    return totalLikes
  }
  const getComments = (name) => {

    const totalComments = blogs.filter(b => b.user.name === name).map(b => b.comments.length).reduce(((p,c) => p+c),0)
    return totalComments
  }


  return(
    <>
      <h2>Users</h2>
      <table>
        <tbody id='table'>
          <tr>
            <td></td>
            <td>
              <div>total blogs</div>
              <div>(created)</div>
            </td>
            <td>
              <div>total likes</div>
              <div>(received)</div>
            </td>
            <td>
              <div>total comments</div>
              <div>(received)</div>
            </td>
          </tr>
          {users &&
            users.map(u =>
              <tr key={u.id}>

                <td>
                  <Link to={`/users/${u.id}`} >
                    <h3>{u.name}</h3>
                  </Link>
                </td>
                <td>
                  <h3>{u.blogsPublished.length}</h3>
                </td>
                <td>
                  <h3>{getLikes(u.name)}</h3>
                </td>
                <td>
                  <h3>{getComments(u.name)}</h3>
                </td>
              </tr>

            )
          }
        </tbody>
      </table>

    </>
  )
}

export default Users