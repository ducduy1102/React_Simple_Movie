import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../../config';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

// 211
const Banner = () => {
  const { data } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=95f2419536f533cdaa1dadf83c606027`, fetcher);
  // console.log(data);
  const movies = data?.results || [];

  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView="auto">
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { title, poster_path, id } = item;
  // 223 optimize button
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-full bg-white rounded-lg">
      <div className="absolute inset-0 rounded-lg overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
      <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="" className="object-cover w-full h-full rounded-lg" />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-3 text-3xl font-bold">{title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="px-4 py-2 border border-white rounded-md">Adventure</span>
          <span className="px-4 py-2 border border-white rounded-md">Adventure</span>
          <span className="px-4 py-2 border border-white rounded-md">Adventure</span>
        </div>
        {/* 223 new version */}
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch Now</Button>
        {/* old verion */}
        {/* <button className="px-6 py-3 font-medium rounded-lg bg-primary">Watch Now</button> */}
      </div>
    </div>
  );
}

export default Banner;
