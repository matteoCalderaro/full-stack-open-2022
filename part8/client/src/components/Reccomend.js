
import {  useQuery } from "@apollo/client";
import { USER, ALL_BOOKS } from "../queries";

const Recommend = (props) => {

  console.log(props.token);
  const user = useQuery(USER,{
    skip: !props.token,
  });

  const books = useQuery(ALL_BOOKS);

if (!props.show || !user.data || !books.data) {
    return null;
  }
  if (user.error || books.error) {
    return <p>Something went wrong</p>;
  }
  const  {favouriteGenre}  = user.data.me;
  //oppure
  //const  bo  = user.data.me.favouriteGenre;
  console.log(user.data.me);
  const bookRecommendations = books.data.allBooks.filter((b) =>
    b.genres.includes(favouriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      
      {bookRecommendations.length > 0 ? (
        <div>
          <p>
            Books in your favorite genre <strong>{favouriteGenre}</strong>
            </p>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>author</th>
                  <th>published</th>
                </tr>
                
                {bookRecommendations.map((book) => (
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      ) : (
        <p>
          No books have been added yet based on your favorite genre{" "}
          <strong>{favouriteGenre}</strong>
        </p>
      )}
    </div>
  );
};

export default Recommend;