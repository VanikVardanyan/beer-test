import Image from "next/image";
import { useRouter } from "next/router";
import style from "./style.module.scss";

export const BeerItems = ({
  image_url,
  name,
  tagline,
  description,
  abv,
  food_pairing,
  id,
  checkedsBeer,
}) => {
  const router = useRouter();
  const handleToBeer = () => {
    if (checkedsBeer) {
      return;
    }
    router.push(
      {
        pathname: "/beer/[id]",
        query: { id },
      },
      undefined,
      {},
    );
  };
  return (
    <div className={style.wrapper} onClick={handleToBeer}>
      <div>
        <Image src={image_url || "/"} alt="beer" width={40} height={120} />
      </div>
      <div className={style.about}>
        <hr />
        <div className={style.name}>
          <span className={style.rowName}>Name:</span> {name}
        </div>
        {checkedsBeer && (
          <div className={style.tagline}>
            <span className={style.rowName}>tagline:</span> {tagline}
          </div>
        )}

        <div className={style.description}>
          <span className={style.rowName}>description: </span>
          {description}
        </div>
        {checkedsBeer && (
          <>
            <div className={style.abv}>
              <span className={style.rowName}>abv: </span>
              {abv}
            </div>
            <div className={style.pairing}>
              <span className={style.rowName}>pairing: </span>

              {food_pairing}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
