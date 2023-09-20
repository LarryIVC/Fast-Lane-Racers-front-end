import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper } from 'swiper/react';
import {
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/modules';
import {
  getReservation,
  delReservation,
} from '../../redux/reservation/reservationSlice';
import ReservationItem from './ReservationItem';

const ReservationList = () => {
  const dispatch = useDispatch();
  const reservation = useSelector(
    (state) => state.reservations.reservationList,
  );
  const apiUrl = 'http://127.0.0.1:3000/reservations';

  useEffect(() => {
    dispatch(getReservation());
  }, [dispatch]);

  const handleDelete = (id) => {
    const url = `${apiUrl}/${id}`;
    dispatch(delReservation(url));
    console.log(id);
  };

  return (
    <div className="main">
      <Swiper
        modules={[EffectFade, Navigation, Pagination, Scrollbar, A11y]}
        // spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <>
          {reservation.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              handleDelete={handleDelete}
            />
          ))}
        </>
      </Swiper>
    </div>
  );
};

export default ReservationList;
