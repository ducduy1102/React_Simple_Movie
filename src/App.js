import { Fragment, lazy, Suspense } from 'react';
import 'swiper/scss';
import { Routes, Route } from 'react-router-dom';
import Main from './components/layout/Main';
import Banner from './components/banner/Banner';
import MoviePageV2 from './pages/MoviePageV2';
// trước khi dùng lazy
// import HomePages from './pages/HomePages';
// import MoviePage from './pages/MoviePage';
// import MovieDetailsPage from './pages/MovieDetailsPage';

// 228. dùng lazy
// dynamic import (import động dùng tới cái nào load cái đó)
const HomePages = lazy(() => import('./pages/HomePages'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
// để kết hợp wrap routes lại trong Suspense và phải có fallback
// fallback giống loading: khi mạng yếu hay gì gì đó sẽ có loading hiện ra

// 212
function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <Fragment>
                  <Banner></Banner>
                  <HomePages></HomePages>
                </Fragment>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            {/* 232. load more */}
            {/* <Route path="/movies" element={<MoviePageV2></MoviePageV2>}></Route> */}
            <Route path="/movie/:movieId" element={<MovieDetailsPage></MovieDetailsPage>}></Route>
            <Route path="*" element={<>Not found</>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
