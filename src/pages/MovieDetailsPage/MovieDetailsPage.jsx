import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/movies.js';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie).catch(console.error);
  }, [movieId]);

  if (!movie) return <div>Loading movie details...</div>;

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.back}>
        Go back
      </Link>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Genres: {movie.genres.map((g) => g.name).join(', ')}</p>

      <hr />

      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <hr />

      <Outlet />
    </div>
  );
}
