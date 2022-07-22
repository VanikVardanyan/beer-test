import style from "./style.module.scss";
export const Pagination = ({
  totalPage,
  page,
  handleChange,
  handleNavigate,
}) => {
  const pages = [];
  for (let i = 0; i < totalPage; i++) {
    pages.push(i + 1);
  }

  return (
    <div className={style.pagination}>
      <button
        className={style.vavigate}
        onClick={handleNavigate}
        disabled={page == 1}
      >
        {"<<"}
      </button>
      {pages.map((item) => {
        return (
          <button
            key={item}
            className={style.page}
            style={{
              background: page == item ? "blue" : "inherit",
              color: page == item ? "white" : "black",
            }}
            onClick={() => handleChange(item)}
          >
            {item}
          </button>
        );
      })}
      <button
        className={style.vavigate}
        disabled={page == totalPage}
        onClick={() => handleNavigate("next")}
      >
        {">>"}
      </button>
    </div>
  );
};
