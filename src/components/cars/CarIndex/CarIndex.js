import {
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/modules';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from '../../preloader/Loader';
import { fetchAllCars } from '../../../redux/cars/CarsIndexSlice';
import './CarsIndex.css';
import 'swiper/css/bundle';
import CarCard from './CarCard';

const CarsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  const { allCarsArray, isLoadingAllCarsArray } = useSelector((store) => store.allCarsReducer);
  const hasCars = allCarsArray.length > 0;

  return (
    <div className="cars-index-container">
      {isLoadingAllCarsArray ? (
        <Loader />
      ) : (
        <Swiper
          className="container-index"
          modules={[EffectFade, Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          breakpoints={{
            1400: { slidesPerView: 3 },
            900: { slidesPerView: 2 },
            500: { slidesPerView: 1 },
          }}
          navigation
          pagination={{ clickable: true }}
        >
          {hasCars ? (
            allCarsArray.map((car) => (
              <div key={car.id}>
                <SwiperSlide>
                  <CarCard
                    name={car.name}
                    description={car.description}
                    image={car.image}
                    id={car.id}
                    color={car.color}
                  />
                </SwiperSlide>
              </div>
            ))
          ) : (
            <p>No cars found</p>
          )}
          <section slot="container-start" className="slot-start">
            <h1 className="index-title">Latest models</h1>
            <p className="header-instruction">Please Select a Car Model</p>
            <hr className="line-doted" />
          </section>
        </Swiper>
      )}
    </div>
  );
};

export default CarsIndex;
