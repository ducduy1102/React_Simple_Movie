import React, { Fragment } from 'react';
import MovieList from '../components/movie/MovieList';

// 212
const HomePages = () => {
  return (
    <Fragment>
      <section className="pb-20 mb-10 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">Now Playing</h2>
        <MovieList type="now_playing"></MovieList>
      </section>
      <section className="pb-20 mb-10 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">Top Rated</h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="pb-20 mb-10 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">Trending</h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePages;
