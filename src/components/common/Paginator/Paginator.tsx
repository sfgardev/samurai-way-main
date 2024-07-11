import styles from "./Paginator.module.css";

type PaginatorProps = {
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  onChangePage: (usersCount: number) => void;
};

const Paginator = (props: PaginatorProps) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  return (
    <div className={styles.pagination}>
      {Array.from({ length: pagesCount }, (_, index) => (
        <span
          key={index}
          className={props.currentPage === index + 1 ? styles.selectedPage : ""}
          onClick={() => props.onChangePage(index + 1)}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );
};
export default Paginator;
