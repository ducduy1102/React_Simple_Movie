import React from 'react';
import { useNavigate } from 'react-router-dom';
import { tmdbAPI } from '../../config';
import Button from '../button/Button';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import LoadingSkeleton from '../loading/LoadingSkeleton';

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  // 214
  const navigate = useNavigate();
  // end 214
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <img src={tmdbAPI.img500(poster_path)} alt="" className="object-cover w-full h-[250px] rounded-lg mb-5" />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">{title}</h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        {/* add navigate in 214 */}
        {/* 223 optimize button */}
        <Button bgColor="secondary" onClick={() => navigate(`/movie/${id}`)}>
          Watch now
        </Button>
      </div>
    </div>
  );
};

// 230 optimize
// .shape: trong item có nhiều property
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};

// xử lý lỗi
function FallbackComponent() {
  return <p className="text-red-400 bg-red-50">Something went wrong with this component</p>;
}
export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

// 231. loading skeleton
export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <LoadingSkeleton width="100%" height="250px" radius="8px" className="mb-5"></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>
            <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton width="100%" height="50px" radius="6px"></LoadingSkeleton>
      </div>
    </div>
  );
};
