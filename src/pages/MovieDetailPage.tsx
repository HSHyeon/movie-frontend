import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {MovieType} from "../components/movie/Movie.type.ts";
import {axiosInstance} from "../global/axiosInstance.ts";
import Header from "../components/Header.tsx";
import {ReviewType} from "../components/review/Review.type.ts";
import ReviewPreList from "../components/review/ReviewPreList.tsx";
import Swal from "sweetalert2";
import axios from "axios";
import {Image} from "react-bootstrap";
import {PATH} from "../global/constants.ts";

const initialState = {
    averageRating: 0,
    releaseDate: new Date(),
    content: "",
    genre: "",
    id: "",
    imageUrl: "",
    title: ""
}

function MovieDetailPage() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<MovieType>(initialState)
    const [reviews, setReviews] = useState<ReviewType[]>([])
    useEffect(() => {
        axiosInstance.get(`/movie/detail/${id}`)
            .then((resp) => {
                const {data} = resp
                if (data.result === 'success') {
                    console.log(data)
                    setMovie(data.item)
                    setReviews(data.review)
                }

            })
    }, [])
    const handleModify = () => {
        if (id != null) {
            navigate(PATH.updateMovie(id))
        }
    };
    const handleDelete = () => {
        Swal.fire({
            text: "정말 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "확인"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.get(`/movie/delete/${id}`).then((resp) => {
                    const {data} = resp
                    if (data.result === 'success') {
                        Swal.fire({
                            text: "삭제되었습니다",
                            icon: "success"
                        }).then(() => {
                            navigate(-1);
                        })
                    }
                })

            }
        });
    };
    return (
        id && <>
            <Header mode="light"/>
            <div>
                <Image
                    src={movie.imageUrl === "default.jpg" ? "/default.jpg" : movie.imageUrl}
                    alt={movie.title}
                    className="position-absolute top-0 start-0 w-100 h-25 z-0 m-0 image-gradient"
                    style={{objectFit: "cover", filter: "grayscale(1) brightness(0.5)"}}
                />
                <div className="image-container position-absolute top-0 start-0 w-100 h-25"></div>
                {localStorage.getItem('role') == 'ROLE_ADMIN' &&
                    <div className="d-flex gap-3 position-absolute top-0 end-0 p-4 z-1">
                        <a className="text-light" onClick={handleModify}>수정</a>
                        <a className="text-danger" onClick={handleDelete}>삭제</a>
                    </div>
                }
                <div className="text-start d-grid d-sm-flex gap-5 mt-5">
                    <img src={movie.imageUrl === "default.jpg" ? "/default.jpg" : movie.imageUrl}
                         style={{height: "30rem", width: "21rem", objectFit: "cover"}}
                         className='top-0 start-0 shadow shadow-sm border border-1 z-3' alt={movie.imageUrl}/>

                    <div className="my-2 flex-grow-1 d-flex flex-column justify-content-end gap-3">
                        <div>
                            <p className='text-muted'>{new Date(movie.releaseDate).getFullYear()} • {movie.genre}</p>
                            <h3 className="fw-bolder mt-2">{movie.title}</h3>
                            <div>{movie.content}</div>
                        </div>
                        <ReviewPreList score={movie.averageRating} id={id} reviews={reviews}/>
                    </div>

                </div>
            </div>
        </>
    );
}

export default MovieDetailPage;