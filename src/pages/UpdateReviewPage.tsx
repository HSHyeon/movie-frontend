import { useNavigate, useParams } from "react-router";
import StarRating from "../components/StarRating.tsx";
import Header from "../components/Header.tsx";
import { Button, Form } from "react-bootstrap";
import { useEffect, useReducer } from "react";
import { ReviewReducer } from "../reducers/ReviewReducer.tsx";
import { ReviewInputType } from "../components/review/Review.type.ts";
import { axiosInstance } from "../global/axiosInstance.ts";
import Swal from "sweetalert2";

const initialState: ReviewInputType = {
    score: 0,
    content: "",
    movieId: 0,
};

function UpdateReviewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(ReviewReducer, initialState);
    useEffect(() => {
        axiosInstance.get(`/review/detail/${id}`).then((resp) => {
            const { data } = resp;
            if (data.result === "success") {
                dispatch({
                    type: "ON_SHOW_ONE_LOAD",
                    payload: data.item,
                });
            }
        });
    }, []);
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
    const onUpdate = () => {
        axiosInstance
            .post(`/review/update`, state)
            .then((resp) => {
                const { data } = resp;
                if (data.result == "success") {
                    navigate(-1);
                } else {
                    Swal.fire({
                        icon: "error",
                        text: data.message,
                    });
                }
            })
            .catch((e) => {
                if (e.status == 403) {
                    Swal.fire({
                        icon: "error",
                        text: "작성권한이 없습니다",
                    });
                    navigate(-1);
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "작성실패",
                    });
                }
            });
    };
    return (
        <div className="d-grid gap-3 border p-5 rounded rounded-3 border-1">
            <Header />
            <h4>리뷰 수정</h4>
            <StarRating onChange={handleRatingChange} value={state.score} />
            {role !== "ROLE_USER" && (
                <div className="d-grid gap-2">
                    <label htmlFor="content">코멘트</label>
                    <Form.Control
                        name="content"
                        value={state.content}
                        onChange={onChange}
                    />
                </div>
            )}
            <Button onClick={onUpdate}>등록</Button>
        </div>
    );
}

export default UpdateReviewPage;
