import css from './SearchBox.module.css';

export default function SearchBox({ value, onFilterChange }) {
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={value}
        className={css.filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
}
