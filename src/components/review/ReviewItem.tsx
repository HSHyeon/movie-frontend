import {ReviewType} from "./Review.type.ts";
import {Card, Col, Row} from "react-bootstrap";
import {PATH} from "../../global/constants.ts";
import {useNavigate} from "react-router";

function ReviewItem({review, onDelete}: { review: ReviewType , onDelete: (id:string)=>void }) {
    const userId = localStorage.getItem('id')
    const navigate = useNavigate();
    const handleModify = () => {
        if (review.id != null) {
            navigate(PATH.updateReview(review.id))
        }
    };

    return (
        <Card className="review-item shadow-sm p-3 my-3 text-start" style={{minWidth: "30rem"}}>
            <Card.Body>
                <Row className="align-items-center mb-2">
                    <Col xs="auto" className="d-flex align-items-center gap-2">
                        <strong className="nickname">{review.nickname}</strong>
                        <span className="rating text-warning">⭐ {review.score}</span>
                    </Col>

                    {userId == review.writerId && (
                        <Col className="d-flex text-end align-items-center gap-2">
                            <a className="text-muted" onClick={handleModify}>수정</a>
                            <a className="text-danger" onClick={()=>onDelete(review.id)}>삭제</a>
                        </Col>
                    )}
                </Row>

                <p className="review-content text-muted" style={{lineHeight: "1.5"}}>
                    {review.content}
                </p>
            </Card.Body>
        </Card>
    );
}

export default ReviewItem;