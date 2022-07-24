import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import request from "./api";

import styles from "../styles/Home.module.scss";
import { IBeer } from "../types";
import { BeerItems } from "../components/beerItem";
import { Pagination } from "../components/pagination";

const Home: NextPage = () => {
  //Весь компонент можно было перебить на мелкие
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [beers, setBeers] = useState<IBeer[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [searchBeer, setSearchBeer] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [row, setRow] = useState(10);

  const handleChangeRow = (value: number) => {
    setRow(value);
  };
  const changeRouter = (query: any) => {
    router.push(
      {
        pathname: "/",
        query,
      },
      undefined,
      {},
    );
  };
  const handleNavigate = (type: string) => {
    if (type === "next") {
      changeRouter({ page: page + 1 });
      return;
    }
    changeRouter({ page: page - 1 });
  };

  const handleChangePage = (page: number) => {
    changeRouter({ page });
  };
  const handleSearch = async () => {
    if (!searchBeer) {
      return;
    }
    setLoading(true);
    try {
      const response = await request(`?beer_name=${searchBeer}`);
      if (!response.data.length) {
        setNoResult(true);
        setLoading(false);

        return;
      }
      setLoading(false);

      setNoResult(false);
      setBeers(response.data);
    } catch (e) {
      setLoading(false);

      console.log(e);
    }
  };
  const beersRequest = useCallback(async () => {
    setNoResult(false);
    setLoading(true);
    try {
      const response = await request.get(`?page=${page}&per_page=${row}`);
      setBeers(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [page, row]);
  console.log(page, "is page");
  useEffect(() => {
    beersRequest();
    if (router.isReady) {
      setPage(+router?.query?.page! || 1);
    }
  }, [beersRequest, router.query.page, router.isReady]);

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchBeer}
          onChange={(e) => setSearchBeer(e.target.value)}
          className={styles.searchInp}
        />
        <button
          onClick={handleSearch}
          className={styles.searchBtn}
          disabled={!searchBeer}
        >
          search
        </button>
        {/* Можно было использовать пагинцию mui или другой либы но я решил написать свою, не большую */}
        {noResult && (
          <span className={styles.errorText}>Такого пива не существует</span>
        )}
      </div>
      <div>
        <Pagination
          totalPage={10} //не нашел общее количество чтобы разделить на per_page
          page={page}
          handleChange={handleChangePage}
          handleNavigate={handleNavigate}
          row={row}
          handleChangeRow={handleChangeRow}
        />
      </div>

      <>
        {loading ? (
          <div className={styles.loader}>...loading</div>
        ) : (
          <div className={styles.beersWrapper}>
            {beers.map((item) => {
              return <BeerItems key={item.id} {...item} />;
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default Home;
