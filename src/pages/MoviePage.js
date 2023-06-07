import React, { useEffect, useState } from 'react';
import { fetcher, tmdbAPI } from '../config';
import useSWR from 'swr';
import MovieCard from '../components/movie/MovieCard';
import useDebounce from '../hooks/useDebounce';
import ReactPaginate from 'react-paginate';
import { MovieCardSkeleton } from '../components/movie/MovieCard';
import { v4 } from 'uuid';

// 221 phân trang
const itemsPerPage = 20;
// 212 - 213
const MoviePage = () => {
  // 221
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // 220 phan trang
  const [nextPage, setNextPage] = useState(1);
  // 218 search + 220 phan trang
  const [filter, setFilter] = useState('');
  // old version
  // const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=95f2419536f533cdaa1dadf83c606027&page=${nextPage}`);
  // new version 225
  const [url, setUrl] = useState(tmdbAPI.getMovieList('popular', nextPage));

  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // 213 + 219(loading) + 231 loadingSkeleton
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;

  // 218
  useEffect(() => {
    if (filterDebounce) {
      // old
      // setUrl(`https://api.themoviedb.org/3/search/movie?api_key=95f2419536f533cdaa1dadf83c606027&query=${filterDebounce}&page=${nextPage}`);
      // new 225
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList('popular', nextPage));
    }
  }, [filterDebounce, nextPage]);
  // end 218
  // if (!data) return null;
  const movies = data?.results || [];

  // 221 + 222 phan trang
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
    // console.log(data.total_results);
    // console.log(data.total_pages);
  }, [data, itemOffset]);
  // console.log(data);

  // Invoke when user click to request another page.
  // offset: hiển thị dấu "..."
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
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
      {/* {loading && <div className="w-10 h-10 mx-auto border-4 border-t-4 rounded-full border-t-transparent border-primary animate-spin"></div>}
      <div className="grid grid-cols-4 gap-10">
        {!loading && movies.length > 0 && movies.map((item) => <MovieCard key={item.id} item={item}></MovieCard>)}
      </div> */}

      {/*C2 231+232 Loading Skeleton */}
      {/* nếu bị rắc rối trong đặt key thì use package uuid: vì nó tạo 1 id riêng biệt */}
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading && movies.length > 0 && movies.map((item) => <MovieCard key={item.id} item={item}></MovieCard>)}
      </div>
      {/* 222 c1 phan trang */}
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="select-none pagination"
        />
      </div>
      {/* end 222 */}

      {/* 221 paginagte old */}
      {/* leading: line-height + 220 phan trang*/}
      {/* <div className="flex items-center justify-center hidden mt-10 gap-x-5">
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => setNextPage(nextPage - 1)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
        {new Array(pageCount).fill(0).map((item, index) => (
          <span className="inline-block px-4 py-2 leading-none bg-white rounded cursor-pointer text-slate-900" onClick={() => setNextPage(index + 1)}>
            {index + 1}
          </span>
        ))}
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            // well
            onClick={() => setNextPage(nextPage + 1)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </div> */}
    </div>
  );
};

export default MoviePage;
