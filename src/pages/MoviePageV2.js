import React, { useEffect, useState } from 'react';
import { fetcher, tmdbAPI } from '../config';
import MovieCard from '../components/movie/MovieCard';
import useDebounce from '../hooks/useDebounce';
import { MovieCardSkeleton } from '../components/movie/MovieCard';
import { v4 } from 'uuid';
import useSWRInfinite from 'swr/infinite';
import Button from '../components/button/Button';

// ************************232+233. Version load more************************
// 221 phân trang
const itemsPerPage = 20;
// 212 - 213
const MoviePageV2 = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [url, setUrl] = useState(tmdbAPI.getMovieList('popular', nextPage));
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  // Đoạn này hơi lú nghe kỹ phút 8:00 bài 232
  const { data, error, size, setSize } = useSWRInfinite((index) => url.replace('page=1', `page=${index + 1}`), fetcher);
  // reduce gom 2 phần tử trong mảng lại làm 1
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  console.log(movies);
  const loading = !data && !error;
  // 233
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
  console.log(isReachingEnd);
  // 218
  useEffect(() => {
    if (filterDebounce) {
      // old
      // setUrl(`https://api.themoviedb.org/3/search/movie?api_key=95f2419536f533cdaa1dadf83c606027&query=${filterDebounce}&page=${nextPage}`);
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList('popular', nextPage));
    }
  }, [filterDebounce, nextPage]);
  // end 218

  // 221 + 222 phan trang
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            onChange={handleFilterChange}
            type="text"
            className="w-full p-4 text-white outline-none bg-slate-800"
            placeholder="Type here to search..."
          />
        </div>
        <button className="p-4 text-white bg-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
      {/*C1 219 loading */}
      {loading && <div className="w-10 h-10 mx-auto border-4 border-t-4 rounded-full border-t-transparent border-primary animate-spin"></div>}
      <div className="grid grid-cols-4 gap-10">
        {!loading && movies.length > 0 && movies.map((item) => <MovieCard key={item.id} item={item}></MovieCard>)}
      </div>

      {/*C2 231+232 Loading Skeleton */}
      {/* nếu bị rắc rối trong đặt key thì use package uuid: vì nó tạo 1 id riêng biệt */}
      {/* {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading && movies.length > 0 && movies.map((item) => <MovieCard key={item.id} item={item}></MovieCard>)}
      </div> */}

      {/* 232 + 233. c2 Load more sử dụng useSWRInfinite của swr*/}
      {/* Version load more */}
      <div className="mt-10 text-center">
        <Button onClick={() => setSize(size + 1)} disabled={isReachingEnd} className={`${isReachingEnd ? 'bg-slate-300' : ''}`}>
          Load more
        </Button>
      </div>
    </div>
  );
};

export default MoviePageV2;
