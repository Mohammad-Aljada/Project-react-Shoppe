import style from "./loader.module.css";

export default function Loader() {
  return (
    <>
      <div className={`container ${style.loaders}`}>
        <span className={style.loader}></span>
      </div>
    </>
  );
}
