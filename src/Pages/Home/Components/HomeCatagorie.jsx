import axios from "axios";
import { useEffect, useState } from "react"
import { Navigation, A11y } from 'swiper/modules';

import './Home.css'; // Import CSS file for custom styles
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { NavLink } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

export default function HomeCatagorie() {
  const[catagories , setCatagories] = useState([]);
  const[loader , setLoader] = useState(true);
  const[error , setError] = useState('');

    const getCatagories = async ()=>{
      try{
           const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=7`);
        setCatagories(data.categories);
        setError('');
      }catch(error){
      setError("error loading categories data");
      
      }
      finally{
        setLoader(false);
      }
    }

    useEffect(() => {
        getCatagories();
    },[])

  if(loader){
    return(
    <Loader/>
    )
  }

  return (
    <>
   {error?? <p className="error">{error}</p>}
    <section  className="Category">
    <div className="container">
      <h2 className="title">categories</h2>
    <Swiper
          modules={[Navigation , A11y]}
      spaceBetween={50}
      slidesPerView={5}
      onSwiper={ () =>  console.log("swiper")}
      onSlideChange={() => 
        console.log("Slide change")
      }
      navigation={true}
    >
    {
      (catagories.length>0)? catagories.map(catagory => 
        
          <div className="col-lg-6 col-md-4 col-sm-6"  key={catagory.id}>
             <SwiperSlide className="swiperSlide" key={catagory._id}><NavLink to="" className="swiperSlide">
             <img className="circular-image" src={catagory.image.secure_url}alt="slide image" />
             <span className="cat-title">{catagory.name}</span></NavLink>
             </SwiperSlide>
              </div>
        ):<h2>empty data</h2> }

    </Swiper>
     </div>
    </section>
    </>
  )
}
