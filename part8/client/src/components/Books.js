import { useLazyQuery, useQuery } from '@apollo/client';
import { ALL_BOOKS } from './../queries';
import { useEffect, useState } from 'react';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  const [getBooksByGenre, genreResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  });

  const [genre, setGenre] = useState('all');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  useEffect(() => {
    if (genreResult.data) {
      setBooks(genreResult.data.allBooks);
    }
  }, [genreResult.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading || genreResult.loading) {
    return <div>loading...</div>;
  }
  const { allBooks } = result.data;
  console.log(allBooks);

  const genres = [...new Set(allBooks.flatMap((b) => b.genres))].concat('all');
  console.log(genres);

  const handleGenreClick = (genre) => {
    setGenre(genre);

    if (genre === 'all') {
      setBooks(allBooks);
      return;
    }

    getBooksByGenre({ variables: { genre: genre } });
  };

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
