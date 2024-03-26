import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import { MovieCardSkeleton } from "./MovieCard";

// https://api.themoviedb.org/3/movie/upcoming?api_key=5570dfe1051cca6984d38424bb09bfd4
const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  // 231
  const isLoading = !data && !error;
  // c1
  // useEffect(() => {
  //   if (data && data.results) setMovies(data.results);
  // }, [data]);

  // c2
  const movies = data?.results || [];

  // console.log(movies);
  return (
    <div className="movie-list">
      {isLoading && (
        <>
          <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
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
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
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

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};

// xử lý lỗi
function FallbackComponent() {
  return (
    <p className="text-red-400 bg-red-50">
      Something wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieList, {
  FallbackComponent,
});
