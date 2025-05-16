import css from './Contact.module.css';
import { FaUser, FaPhone } from 'react-icons/fa';

export default function Contact({ data: { id, name, number }, onDelete }) {
  return (
    <div className={css.card}>
      <div>
        <p>
          <FaUser className={css.icon} />
          {name}
        </p>
        <p>
          <FaPhone className={css.icon} />
          {number}
        </p>
      </div>
      <div>
        <button
          className={css.button}
          onClick={() => {
            onDelete(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
