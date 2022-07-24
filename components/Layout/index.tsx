import style from "./style.module.scss";

export const Layout = ({ children }) => {
  return (
    <div className={style.wrpapper}>
      <div className={style.navbar_wrapper}>
        <div className={style.navbar}>Сделано от Ван Варданян</div>
      </div>
      {children}
    </div>
  );
};
