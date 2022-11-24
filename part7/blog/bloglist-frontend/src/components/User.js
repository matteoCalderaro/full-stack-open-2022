import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const User = () => {
  const users = useSelector(state => state.users);

  const id = useParams().id;
  const user = users.find(b => b.id === id);

  if (!user) {
    return null;
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs...</h3>
      {user.blogsPublished.length === 0 ? (
        <h4 style={{ color: 'red' }}>--- not blogs yet ---</h4>
      ) : (
        <ul>
          {user.blogsPublished.map(b => (
            <Link to={`/blogs/${b.id}`} key={b.id}>
              <li style={{ marginBottom: 5 }}>{b.title}</li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default User;
