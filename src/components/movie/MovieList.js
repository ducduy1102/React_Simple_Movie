import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { SwiperSlide, Swiper } from 'swiper/react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { MovieCardSkeleton } from './MovieCard';

// 209
// https://api.themoviedb.org/3/movie/upcoming?api_key=95f2419536f533cdaa1dadf83c606027
const MovieList = ({ type = 'now_playing' }) => {
  // c1 209
  // const [movies, setMovies] = useState([]);
  // const { data } = useSWR(`https://api.themoviedb.org/3/movie/${type}?api_key=95f2419536f533cdaa1dadf83c606027`, fetcher);
  // console.log(data);
  // c2 config 224
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  // 231
  const isLoading = !data && !error;
  // c1: 209
  // useEffect(() => {
  //   if (data && data.results) setMovies(data.results);
  // }, [data]);

  // c2 211
  const movies = data?.results || [];

  // console.log(movies);
  return (
    <div className="movie-list">
      {/* 231 loading skeleton */}
      {isLoading && (
        <>
          <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

// 230 optimize
MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};

// xử lý lỗi
function FallbackComponent() {
  return <p className="text-red-400 bg-red-50">Something wrong with this component</p>;
}

export default withErrorBoundary(MovieList, {
  FallbackComponent,
});
