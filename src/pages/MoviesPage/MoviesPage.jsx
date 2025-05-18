import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/movies.js';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [movies, setMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.query.value.trim();
    if (searchQuery === '') return;
    setSearchParams({ query: searchQuery });
    form.reset();
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
        setNotFound(results.length === 0); // Показати повідомлення, якщо результатів нема
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          placeholder="Search movies..."
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {notFound && (
        <p className={css.message}>
          Sorry, we couldn't find any movies matching your search.
        </p>
      )}

      {!notFound && <MovieList movies={movies} />}
    </div>
  );
}
