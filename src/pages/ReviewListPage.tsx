import {useEffect, useState} from 'react';
import ReviewItem from "../components/review/ReviewItem.tsx";
import {axiosInstance} from "../global/axiosInstance.ts";
import {ReviewType} from "../components/review/Review.type.ts";
import {useNavigate, useParams} from "react-router";
import {Button} from "react-bootstrap";
import {PATH} from "../global/constants.ts";
import Header from "../components/Header.tsx";

function ReviewListPage() {
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    useEffect(() => {
        axiosInstance.get(`/review/${id}`)
            .then((resp) => {
                const {data} = resp
                if (data.result === 'success') {
                    console.log(data.list)
                    setReviews(data.list);
                }

            })
            .catch((error) => {
                console.error("리뷰 가져오기 실패:", error);
            });
    }, [id])
    return (
        id && <div>
            <Header />
            <h4>전체 리뷰</h4>
            {reviews.length? (
                reviews.map((review) => (
                    <ReviewItem key={review.id} review={review}/>
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