import { Fragment, lazy, Suspense } from "react";
import "swiper/scss";
import { Routes, Route } from "react-router-dom";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
import MoviePageV2 from "./pages/MoviePageV2";

const HomePages = lazy(() => import("./pages/HomePages"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

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
            {/* Load more */}
            {/* <Route path="/movies" element={<MoviePageV2></MoviePageV2>}></Route> */}
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
            <Route path="*" element={<>Not found</>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
