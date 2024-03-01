import "./Home.css"
export default function Hero() {
  return (
    <>
    <section className="Hero">
    <div className="container">
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 hero-info">
                <div className="hero-image">
                    <img src="Home.jpg" alt="Home photo" />
                </div>
                <div className="hero-content">
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
