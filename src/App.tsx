import './App.css'
import LoginPage from './pages/LoginPage'
import {BrowserRouter, Route, Routes} from "react-router";
import MovieListPage from "./pages/MovieListPage.tsx";
import MovieDetailPage from "./pages/MovieDetailPage.tsx";
import {PATH} from "./global/constants.ts";
import WriteMoviePage from "./pages/WriteMoviePage.tsx";
import WriteReviewPage from "./pages/WriteReviewPage.tsx";
import ReviewListPage from "./pages/ReviewListPage.tsx";
import UpdateMoviePage from "./pages/UpdateMoviePage.tsx";
import UpdateReviewPage from "./pages/UpdateReviewPage.tsx";
import UpdateRolePage from "./pages/UpdateRolePage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path={PATH.root} element={<LoginPage/>}/>
              <Route path={PATH.movie} element={<MovieListPage/>}/>
              <Route path={PATH.updateRole} element={<UpdateRolePage/>}/>
              <Route path={PATH.writeMovie} element={<WriteMoviePage/>}/>
              <Route path={PATH.movieDetail(":id")} element={<MovieDetailPage/>}/>
              <Route path={PATH.updateMovie(":id")} element={<UpdateMoviePage/>}/>
              <Route path={PATH.review(":id")} element={<ReviewListPage/>}/>
              <Route path={PATH.writeReview(":id")} element={<WriteReviewPage/>}/>
              <Route path={PATH.updateReview(":id")} element={<UpdateReviewPage/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
