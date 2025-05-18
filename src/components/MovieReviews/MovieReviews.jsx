import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api/movies.js';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then(setReviews)
      .catch((error) => console.error('Reviews fetch error:', error));
  }, [movieId]);

  if (!reviews) return <p>Loading reviews...</p>;

  if (reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <ul className={css.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <h4>{author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
}
