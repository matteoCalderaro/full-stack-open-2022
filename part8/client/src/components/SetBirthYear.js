import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR } from './../queries';
import { useState } from 'react';

const SetBirthYear = ({ authors }) => {
  const [name, setName] = useState('');

  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const submit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name, setBornTo: born } });
    setName('');
    setBorn('');
  };
  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option>Author</option>
            {authors.map((a, index) => (
              <option key={index}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born:
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">change</button>
      </form>
    </div>
  );
};

export default SetBirthYear;
