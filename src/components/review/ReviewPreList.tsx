import {PATH} from "../../global/constants.ts";
import {Button, Card} from "react-bootstrap";
import {useNavigate} from "react-router";
import {ReviewType} from "./Review.type.ts";

function ReviewPreList({reviews, id, score}: { reviews: ReviewType[], id: string, score:number }) {
    const navigate = useNavigate()
    return (
        <div>
            <div className='d-flex justify-content-between mt-3 '>
                <p className="fw-bold">리뷰</p>
                {score != -1 && <a className='text-muted' onClick={() => {
                    navigate(PATH.review(id))
                }}>⭐{score} 전체보기</a>}
            </div>
            <Card className="text-muted mt-2 text-muted p-3">
                {
                    reviews.length > 0 ? (
                        reviews.map((review) => <div  key={review.id}>
                            <div>⭐{review.score} | {review.content}</div>
                        </div>)
                    ) : (
                        <Card.Body className="text-center">코멘트가 없습니다.</Card.Body>
                    )
                }</Card>
            <Button
                variant="primary"
                className="mt-3 px-4 py-2"
                onClick={() => navigate(PATH.writeReview(id))}
            >
                리뷰 작성
            </Button>
        </div>
    )
        ;
}

export default ReviewPreList;