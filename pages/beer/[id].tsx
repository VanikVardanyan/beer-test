import { NextPage } from "next";
import { useRouter } from "next/router";
import { BeerItems } from "../../components/beerItem";
import { GetServerSidePropsContext, GetServerSideProps } from "next";

import { IBeer } from "../../types";
import request from "../api";

type PageProps = {
  beer: IBeer[] | [];
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query;

  try {
    const response = await request(`?ids=${id}`);
    return {
      props: {
        beer: response.data,
      },
    };
  } catch (e) {
    return {
      props: {
        beer: [],
      },
    };
  }
};

const Beer: NextPage<PageProps> = ({ beer }) => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.back()}> {"<="} Вернуться назад</button>
      {beer.length ? (
        <BeerItems {...beer[0]} checkedsBeer />
      ) : (
        <div>Ошибка, не найдено</div>
      )}
    </div>
  );
};

export default Beer;