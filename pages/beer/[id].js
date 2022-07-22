import { useRouter } from "next/router";
import { BeerItems } from "../../components/beerItem";
import request from "../api";

export async function getServerSideProps(context) {
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
}

export default function Beer({ beer }) {
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
}
