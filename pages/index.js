import { useCallback, useEffect, useState } from "react";
import request from "./api";
import { BeerItems } from "../components/beerItem";
import { Pagination } from "../components/pagination";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.scss";
// Можно было бы добавить общие стили через mixin итд
export default function Home() {
  //Весь компонент можно было перебить на мелкие
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchBeer, setSearchBeer] = useState("");
  const [noResult, setNoResult] = useState(false);
  const per_page = 10; //можно было бы сделать это динамическим
  const changeRouter = (query) => {
    router.push(
      {
        pathname: "/",
        query,
      },
      undefined,
      {},
    );
  };
  const handleNavigate = (type) => {
    if (type === "next") {
      changeRouter({ page: page + 1 });
      return;
    }
    changeRouter({ page: page - 1 });
  };

  const handleChangePage = (page) => {
    changeRouter({ page });
    setPage(page);
  };
  const handleSearch = async () => {
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
    setLoading(true);
    try {
      const response = await request.get(`?page=${page}&per_page=${per_page}`);
      setBeers(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [page, per_page]);

  useEffect(() => {
    beersRequest();
    if (router.isReady) {
      setPage(+router.query.page || 1);
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
        <button onClick={handleSearch} className={styles.searchBtn}>
          search
        </button>
        {noResult && (
          <span className={styles.errorText}>Такого пива не существует</span>
        )}
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
      {/* Можно было использовать пагинцию mui или другой либы но я решил написать свою, не большую */}
      <Pagination
        totalPage={10} //не нашел общее количество чтобы разделить на per_page
        page={page}
        handleChange={handleChangePage}
        handleNavigate={handleNavigate}
      />
    </div>
  );
}
