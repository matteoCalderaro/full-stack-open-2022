import { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { useApolloClient, useSubscription, gql } from '@apollo/client';
import Reccomend from './components/Reccomend';
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  AUTHOR_DETAILS,
  BOOK_DETAILS,
} from './queries';

// SUBSCRIPTION ******************************
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
export const AUTHOR_CHANGED = gql`
  subscription {
    authorChanged {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

const App = () => {
  const [message, setMessage] = useState('');
  const [page, setPage] = useState('authors');
  // added variable token to the state
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);
  const notify = (message) => {
    setMessage(message);
  };

  // added new button logout
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors');
  };

  // SUBSCRIPTION **********************
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      console.log(addedBook.author.name);
      notify(`${addedBook.title} added`);

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
      client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const esiste = allAuthors.find((a) => a.id === addedBook.author.id);
        if (!esiste) {
          console.log(esiste);
          return {
            allAuthors: allAuthors.concat(addedBook.author),
          };
        }
        return;
      });
    },
  });
  useSubscription(AUTHOR_CHANGED, {
    onData: ({ data }) => {
      const changedAuthor = data.data.authorChanged;
      notify(`${changedAuthor.name} changed`);
    },
  });
  //********************************

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('reccomend')}>reccomend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Notification message={message} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <Reccomend token={token} show={page === 'reccomend'} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;
