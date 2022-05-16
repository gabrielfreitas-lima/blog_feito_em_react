import "./styles.css";

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      placeholder="Post"
      className="input"
      onChange={handleChange}
      value={searchValue}
      type="search"
    />
  );
};
