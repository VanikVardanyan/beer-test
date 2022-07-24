import { ChangeEvent } from "react";
import { IPagination } from "../../types";

import style from "./style.module.scss";
import { clsx } from "clsx";

export const Pagination = ({
  totalPage,
  page,
  handleChange,
  handleNavigate,
  row,
  handleChangeRow,
}: IPagination) => {
  const options = [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 25, label: 25 },
  ];

  const handleChangeRowSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    handleChangeRow(+e.target.value);
  };
  const pages = [];
  for (let i = 0; i < totalPage; i++) {
    pages.push(i + 1);
  }

  return (
    <div className={style.paginationWrapper}>
      <div className={style.pagination}>
        <button
          className={style.navigate}
          onClick={() => handleNavigate("back")}
          disabled={page == 1}
        >
          {"<"}
        </button>
        {pages.map((item) => {
          return (
            <button
              key={item}
              className={clsx(style.page, {
                [style.page_active]: page == item,
              })}
              onClick={() => handleChange(item)}
            >
              {item}
            </button>
          );
        })}
        <button
          className={style.navigate}
          disabled={page == totalPage}
          onClick={() => handleNavigate("next")}
        >
          {">"}
        </button>
      </div>
      <div className={style.select}>
        <label htmlFor="cars">Rows per page: </label>
        <select value={row} onChange={handleChangeRowSelect}>
          {options.map(({ value, label }) => {
            return (
              <option value={value} key={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
