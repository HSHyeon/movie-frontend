import "bootstrap-icons/font/bootstrap-icons.css";
import {useNavigate, useParams} from "react-router";
import InputBase from "../components/InputBase.tsx";
import StarRating from "../components/StarRating.tsx";
import Header from "../components/Header.tsx";
import {Button} from "react-bootstrap";
import {useEffect, useReducer} from "react";
import {ReviewReducer} from "../reducers/ReviewReducer.tsx";
import {ReviewInputType} from "../components/review/Review.type.ts";
import {axiosInstance} from "../global/axiosInstance.ts";
import Swal from "sweetalert2";

const initialState: ReviewInputType = {
    writerId: "",
    score: 0, content: ""
}

function UpdateReviewPage() {
    const {id} = useParams();
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(ReviewReducer, initialState)
    useEffect(() => {
        axiosInstance.get(`/review/detail/${id}`)
            .then((resp) => {
                const {data} = resp
                if (data.result === 'success') {
                    console.log(data)
                    dispatch({
                        type:"ON_SHOW_ONE_LOAD",
                        payload:data.item
                    })
                }

            })
    }, [])
    const role = localStorage.getItem('role')
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        dispatch({
            type: "ON_CHANGE",
            payload: {name, value},
        });
    }
    const handleRatingChange = (newRating: number) => {
        console.log("사용자가 선택한 별점:", newRating);
        const name = "score"
        dispatch({
            type: "ON_CHANGE",
            payload: {name, value: newRating}
        })
    };
    const onWrite = () => {

        const requestData = {
            ...state,
            writerId: localStorage.getItem('id')
        };
        console.log("전송할 데이터:", requestData);
        axiosInstance.post(`/review/update`,
            requestData
        ).then((resp) => {
            const {data} = resp;
            if (data.result == 'success') {
                navigate(-1)
            } else {
                Swal.fire({
                    icon: 'error',
                    text: data.message
                })
            }

        }).catch((e) => {
            if (e.status == 403) {
                Swal.fire({
                    icon: 'error',
                    text: '작성권한이 없습니다'
                })
                navigate(-1)
            } else {
                Swal.fire({
                    icon: 'error',
                    text: '작성실패'
                })
            }

        })
    }
    return (

        <div className='d-grid gap-3 border p-5 rounded rounded-3 border-1'>
            <Header/>
            <h4>리뷰 수정</h4>
            <StarRating onChange={handleRatingChange} value={state.score}/>
            {role !== 'ROLE_USER' &&
                <div className='d-grid gap-2'>
                    <label htmlFor='content'>코멘트</label>
                    <InputBase name='content' value={state.content} change={onChange}/>
                </div>
            }
            <Button onClick={onWrite}>등록</Button>
        </div>
    );
}

export default UpdateReviewPage;