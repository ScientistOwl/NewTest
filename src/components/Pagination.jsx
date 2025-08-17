import styles from "../styles/Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={i + 1 === currentPage ? styles.active : ""}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
