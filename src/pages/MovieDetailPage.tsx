import {SyntheticEvent, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router";
import { MovieType } from "../components/movie/Movie.type.ts";
import { axiosInstance } from "../global/axiosInstance.ts";
import Header from "../components/Header.tsx";
import { ReviewType } from "../components/review/Review.type.ts";
import ReviewPreList from "../components/review/ReviewPreList.tsx";
import Swal from "sweetalert2";
import { Image } from "react-bootstrap";
import { PATH } from "../global/constants.ts";

const initialState = {
    averageRating: 0,
    releaseDate: new Date(),
    content: "",
    genre: "",
    id: "",
    imageUrl: "",
    title: "",
};

function MovieDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<MovieType>(initialState);
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [reviewTotal, setReviewTotal] = useState<number>(0)
    useEffect(() => {
        axiosInstance.get(`/movie/detail/${id}`).then((resp) => {
            const { data } = resp;
            if (data.result === "success") {
                setMovie(data.item);
                setReviews(data.review);
                setReviewTotal(data.reviewTotal)
            }
        });
    }, [id]);
    const handleModify = () => {
        if (id != null) {
            navigate(PATH.updateMovie(id));
        }
    };
    const handleErrorImg =(e: SyntheticEvent<HTMLImageElement, Event>)=>{
        e.currentTarget.src="/default.jpg"
    }
    const handleDelete = () => {
        Swal.fire({
            text: "정말 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "확인",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance
                    .get(`/movie/delete/${id}`)
                    .then((resp) => {
                        const { data } = resp;
                        if (data.result === "success") {
                            Swal.fire({
                                text: "삭제되었습니다",
                                icon: "success",
                            }).then(() => {
                                navigate(-1);
                            });
                        }
                    })
                    .catch((e) => {
                        if (e.status == 403) {
                            Swal.fire({
                                icon: "error",
                                text: "삭제 권한이 없습니다",
                            });
                        }
                    });
            }
        });
    };
    return (
        id && (
            <>
                <Header mode="light" />
                <div>
                    <Image
                        src={
                            movie.imageUrl === "default.jpg"
                                ? "/default.jpg"
                                : movie.imageUrl
                        }
                        alt={movie.title}
                        onError={handleErrorImg}
                        className="position-absolute top-0 start-0 w-100 z-0 m-0 image-gradient"
                        style={{
                            height: "17rem",
                            objectFit: "cover",
                            filter: "grayscale(1) brightness(0.5)",
                        }}
                    />
                    <div className="image-container position-absolute top-0 start-0 w-100 h-25"></div>
                    {localStorage.getItem("role") == "ROLE_ADMIN" && (
                        <div className="d-flex gap-3 position-absolute top-0 end-0 p-4 z-1">
                            <a className="text-light" onClick={handleModify}>
                                수정
                            </a>
                            <a className="text-danger" onClick={handleDelete}>
                                삭제
                            </a>
                        </div>
                    )}
                    <div className="text-start d-grid d-sm-flex gap-5 mt-5">
                        <img
                            src={
                                movie.imageUrl === "default.jpg"
                                    ? "/default.jpg"
                                    : movie.imageUrl
                            }
                            onError={handleErrorImg}
                            style={{
                                height: "30rem",
                                width: "21rem",
                                objectFit: "cover",
                            }}
                            className="top-0 start-0 shadow z-3"
                            alt={movie.imageUrl}
                        />
                        <div className="flex-grow-1 d-flex flex-column justify-content-end">
                            <div className="p-3 rounded-3 bg-white z-3 d-grid gap-3">
                                <div><p className="text-muted">
                                    {new Date(movie.releaseDate).getFullYear()}{" "}
                                    • {movie.genre}
                                </p>
                                <h3 className="fw-bolder mt-2">
                                    {movie.title}
                                </h3>
                                <div style={{ whiteSpace: "pre-wrap"}}>{movie.content}</div>
                            </div>
                            <ReviewPreList
                                score={movie.averageRating}
                                id={id}
                                total={reviewTotal}
                                reviews={reviews}
                            />
                        </div>
                    </div>
                    </div></div>
            </>
        )
    );
}

export default MovieDetailPage;
