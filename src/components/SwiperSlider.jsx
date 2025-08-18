
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';

const SwiperSlider = () => {
  const books = useSelector((state) => state.books);
  const latestBooks = books.slice(-5);

  if (latestBooks.length === 0) {
    return <h2>No books available</h2>;
  }

  return (
    <div className="container">
      <h1 className="heading">Latest Books</h1>

      {/* Swiper */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        spaceBetween={-150}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {latestBooks.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.selectedFile} alt="slide_image" className="swiper-img" />
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>

      {/* CSS inside the component */}
      <style>{`
        .container {
          width: 100%;
          max-width: 1200px;
          margin: auto;
          text-align: center;
          font-family: 'Poppins', sans-serif;
        }

        .heading {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .swiper_container {
          width: 100%;
          padding: 20px 10px;
        }

        .swiper-img {
          object-fit: cover;
          height: 350px;
          border-radius: 7px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .slider-controler {
          margin-top: 10px;
        }

        .swiper-pagination {
          position: relative;
        }

        .swiper-pagination-bullet {
          background: #333 !important;
          opacity: 0.6;
        }

        .swiper-pagination-bullet-active {
          background: #007bff !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default SwiperSlider;
