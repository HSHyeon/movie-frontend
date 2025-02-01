import {useEffect, useReducer} from 'react';
import ReviewItem from "../components/review/ReviewItem.tsx";
import {axiosInstance} from "../global/axiosInstance.ts";
import {useNavigate, useParams} from "react-router";
import {Button} from "react-bootstrap";
import {PATH} from "../global/constants.ts";
import Header from "../components/Header.tsx";
import Swal from "sweetalert2";
import {ReviewReducer} from "../reducers/ReviewReducer.tsx";
import {ReviewType} from "../components/review/Review.type.ts";

function ReviewListPage() {
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [reviews, dispatch] = useReducer(ReviewReducer, { list: [], loading: true });
    useEffect(() => {
        axiosInstance.get(`/review/${id}`)
            .then((resp) => {
                const {data} = resp
                console.log(data.list)
                if (data.result === 'success') {
                    dispatch({
                        type: "ON_SHOW_ALL_LOAD",
                        payload: {list: data.list}
                    })
                }

            })
            .catch((error) => {
                console.error("리뷰 가져오기 실패:", error);
            });
    }, [id])
    const onDelete = (id:string) => {
        Swal.fire({
            text: "정말 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "확인"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.get(`/review/delete/${id}`).then((resp) => {
                    const {data} = resp
                    if (data.result === 'success') {
                        Swal.fire({
                            text: "삭제되었습니다",
                            icon: "success"
                        })
                        dispatch({
                            type: "ON_DELETE",
                            payload: { id: id }
                        })
                    }
                })

            }
        });
    };
    return (
        id && <div>
            <Header/>
            <h4 className="fw-bolder">전체 리뷰</h4>
            {reviews.list.length ? (
                reviews.list.map((review:ReviewType) => (
                    <ReviewItem key={review.id} review={review} onDelete={() => onDelete(review.id)}/>
                ))
            ) : (
                <p>리뷰가 없습니다.</p>
            )}
            <Button
                variant="primary"
                className="mt-3 px-4 py-2"
                onClick={() => navigate(PATH.writeReview(id))}
            >
                리뷰 작성
            </Button>
        </div>
    );
}

export default ReviewListPage;