import "./App.css";
import LoginPage from "./pages/LoginPage";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
} from "react-router";
import MovieListPage from "./pages/MovieListPage.tsx";
import MovieDetailPage from "./pages/MovieDetailPage.tsx";
import { PATH } from "./global/constants.ts";
import WriteMoviePage from "./pages/WriteMoviePage.tsx";
import WriteReviewPage from "./pages/WriteReviewPage.tsx";
import ReviewListPage from "./pages/ReviewListPage.tsx";
import UpdateMoviePage from "./pages/UpdateMoviePage.tsx";
import UpdateReviewPage from "./pages/UpdateReviewPage.tsx";
import UpdateRolePage from "./pages/UpdateRolePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

function App() {
    const CheckHasAuth = () => {
        const location = useLocation();
        const currentUser = localStorage.getItem("id");

        if (!currentUser) {
            return (
                <Navigate replace to={PATH.login} state={{ from: location.pathname }} />
            );
        }
        return <Outlet />;
    };
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={PATH.login} element={<LoginPage />} />
                    <Route path={PATH.register} element={<RegisterPage />} />
                    <Route element={<CheckHasAuth />}>
                        <Route path={PATH.root} element={<MovieListPage />} />
                        <Route
                            path={PATH.updateRole}
                            element={<UpdateRolePage />}
                        />
                        <Route
                            path={PATH.writeMovie}
                            element={<WriteMoviePage />}
                        />
                        <Route
                            path={PATH.movieDetail(":id")}
                            element={<MovieDetailPage />}
                        />
                        <Route
                            path={PATH.updateMovie(":id")}
                            element={<UpdateMoviePage />}
                        />
                        <Route
                            path={PATH.review(":id")}
                            element={<ReviewListPage />}
                        />
                        <Route
                            path={PATH.writeReview(":id")}
                            element={<WriteReviewPage />}
                        />
                        <Route
                            path={PATH.updateReview(":id")}
                            element={<UpdateReviewPage />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

