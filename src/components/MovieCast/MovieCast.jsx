import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../api/movies.js';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchMovieCast(movieId)
      .then(setCast)
      .catch((error) => console.error('Cast fetch error:', error));
  }, [movieId]);

  if (!cast) return <p>Loading cast...</p>;

  if (cast.length === 0) return <p>No cast information found.</p>;

  return (
    <ul className={css.list}>
      {cast.map(({ id, name, character, profile_path }, index) => (
        <li key={`${id}-${index}`}>
          <p>
            {name} as {character}
          </p>
          {profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
