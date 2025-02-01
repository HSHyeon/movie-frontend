import { useNavigate, useParams } from "react-router";
import StarRating from "../components/StarRating.tsx";
import Header from "../components/Header.tsx";
import { Button, Form } from "react-bootstrap";
import { useReducer } from "react";
import { ReviewReducer } from "../reducers/ReviewReducer.tsx";
import { ReviewInputType } from "../components/review/Review.type.ts";
import { axiosInstance } from "../global/axiosInstance.ts";
import Swal from "sweetalert2";

const initialState: ReviewInputType = {
    score: 0,
    content: "",
    movieId: 0,
};

function WriteReviewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(ReviewReducer, initialState);

    const role = localStorage.getItem("role");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({
            type: "ON_CHANGE",
            payload: { name, value },
        });
    };
    const handleRatingChange = (newRating: number) => {
        const name = "score";
        dispatch({
            type: "ON_CHANGE",
            payload: { name, value: newRating },
        });
    };

    const onWrite = async () => {
        try {
            // 리뷰 점수 저장
            const scoreResponse = await axiosInstance.post(
                `/review/write/score`,
                {
                    ...state,
                    movieId: id,
                }
            );

            if (scoreResponse.data.result !== "success") {
                throw new Error(scoreResponse.data.message || "점수 저장 실패");
            }

            // 리뷰 코멘트 저장, 평론가 이상만 가능
            if (state.content) {
                await axiosInstance.post("/review/write/content", {
                    id: scoreResponse.data.reviewId,
                    content: state.content,
                });
            }
            Swal.fire({ icon: "success", text: "리뷰가 작성되었습니다" });
            navigate(-1);
        } catch (e) {
            if (e.status === 403) {
                Swal.fire({
                    icon: "error",
                    text: "코멘트 작성 권한이 없습니다",
                });
            } else {
                Swal.fire({ icon: "error", text: e.message || "작성 실패" });
            }
        }
    };

    return (
        <div className="d-grid gap-3 border p-5 rounded rounded-3 border-1">
            <Header />
            <h4>리뷰 작성</h4>
            <StarRating onChange={handleRatingChange} />
            {role !== "ROLE_USER" && (
                <div className="d-grid gap-2">
                    <label htmlFor="content">코멘트</label>
                    <Form.Control name="content" onChange={onChange} />
                </div>
            )}
            <Button onClick={onWrite}>등록</Button>
        </div>
    );
}

export default WriteReviewPage;
