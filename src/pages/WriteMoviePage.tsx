import InputBase from "../components/InputBase.tsx";
import {Button, Form} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import {useNavigate} from "react-router";
import {useReducer} from "react";
import {MovieReducer} from "../reducers/MovieReducer.tsx";
import {PATH} from "../global/constants.ts";
import Swal from "sweetalert2";
import {axiosInstance} from "../global/axiosInstance.ts";
import Header from "../components/Header.tsx";
import {MovieInputType} from "../components/movie/Movie.type.ts";

const initialState: MovieInputType = {
    imageUrl: "", writerId: "",
    title: '', genre: '', content: '', releaseDate: new Date()
}

function WriteMoviePage() {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(MovieReducer, initialState)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        dispatch({
            type: "ON_CHANGE",
            payload: {name, value},
        });
    }
    const onWrite = () => {
        console.log("전송할 데이터:", state);
        const requestData = {
            ...state,
            writerId: localStorage.getItem('id')
        };
        axiosInstance.post('/movie/write',
            requestData
        ).then((resp) => {
            const {data} = resp;
            console.log(resp)
            if (data.result == 'success') {
                navigate(PATH.movie)
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
        <>
            <Header/>
            <div className='d-grid text-start gap-2'>
                <h2 className=' fw-bold'>영화 추가하기</h2>
                <label htmlFor='title'>제목</label>
                <InputBase name='title' change={onChange}/>
                <label htmlFor='genre'>장르</label>
                <InputBase name='genre' change={onChange}/>
                <label htmlFor='releaseDate'>개봉일</label>
                <Form.Control type='date' name='releaseDate' onChange={onChange}/>
                내용
                <InputBase name='content' change={onChange}/>
                <Button variant='primary' onClick={onWrite}>작성</Button>
            </div>
        </>
    );
}

export default WriteMoviePage;