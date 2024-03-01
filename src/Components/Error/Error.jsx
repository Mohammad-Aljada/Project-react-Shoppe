import { NavLink } from "react-router-dom";
import "./Error.css"
export default function Error() {
  return (
    <>
    <section className="Error">
    <div className="container">
            <div className="Error-content col-lg-12 col-md-12 col-sm-12">
                <div className="error-image">
          <img src="errorPage.jpg" alt="Error Image" />
        </div>
        <div className="error-info">
              <h1>404</h1>
              <p>Page not found , Bye</p>
              <NavLink to="/">Back TO Home</NavLink> 
        </div>
           
        
     </div>
    </div>
    </section>

    </>
  )
}
