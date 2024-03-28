import style from "./Home.module.css"
export default function Hero() {
  return (
    <>
    <section className={style.Hero}>
    <div className="container">
        <div className="row">
            <div className={`col-lg-12 col-md-12 col-sm-12 ${style.heroInfo}`}>
                <div className={style.heroImage}>
                    <img src="/Home.jpg" alt="Home photo" />
                </div>
                <div className={style.heroContent}>
                    <h1>SHOPPE</h1>
                    <p>A simple e-commerce website</p>
                </div>
            </div>
        </div>
    </div>
    </section>
    </>
  )
}
