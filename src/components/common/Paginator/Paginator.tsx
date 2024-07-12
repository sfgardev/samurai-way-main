import { useState } from "react";
import styles from "./Paginator.module.css";
import cn from "classnames";

type PaginatorProps = {
  pageSize: number;
  totalItemsCount: number;
  currentPage: number;
  portionSize?: number;
  onChangePage: (usersCount: number) => void;
};

const Paginator = ({
  pageSize,
  totalItemsCount,
  currentPage,
  portionSize = 10,
  onChangePage,
}: PaginatorProps) => {
  const [portionNumber, setPortionNumber] = useState(1);

  const pagesCount = Math.ceil(totalItemsCount / pageSize);

  const pages = Array.from({ length: pagesCount }, (_, i) => {
    return i + 1;
  });
  console.log(pages);

  const portionCount = Math.ceil(pagesCount / portionSize);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.pagination}>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          prev
        </button>
      )}
      {pages
        .filter(
          (page) =>
            page >= leftPortionPageNumber && page <= rightPortionPageNumber
        )
        .map((page) => {
          return (
            <span
              className={cn(
                {
                  [styles.selectedPage]: currentPage === page,
                },
                styles.pageNumber
              )}
              key={page}
              onClick={() => onChangePage(page)}
            >
              {page}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>
          next
        </button>
      )}
      {/* {Array.from({ length: pagesCount }, (_, index) => (
        <span
          key={index}
          className={currentPage === index + 1 ? styles.selectedPage : ""}
          onClick={() => onChangePage(index + 1)}
        >
          {index + 1}
        </span>
      ))} */}
    </div>
  );
};
export default Paginator;
