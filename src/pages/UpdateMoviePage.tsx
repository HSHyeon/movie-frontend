import InputBase from "../components/InputBase.tsx";
import {Button, Form} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import {useNavigate, useParams} from "react-router";
import {useEffect, useReducer} from "react";
import {MovieReducer} from "../reducers/MovieReducer.tsx";
import Swal from "sweetalert2";
import {axiosInstance} from "../global/axiosInstance.ts";
import Header from "../components/Header.tsx";
import {MovieInputType} from "../components/movie/Movie.type.ts";

const initialState: MovieInputType = {
    imageUrl: "", writerId: "",
    title: "", genre: "", content: "", releaseDate: new Date()
}

function UpdateMoviePage() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [state, dispatch] = useReducer(MovieReducer,initialState)
    useEffect(() => {
        axiosInstance.get(`/movie/detail/${id}`)
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
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        dispatch({
            type: "ON_CHANGE",
            payload: {name, value},
        });
    }
    const onUpdate = () => {
        console.log("전송할 데이터:", state);
        const requestData = {
            ...state,
            writerId: localStorage.getItem('id')
        };
        axiosInstance.post(`/movie/update`,
            requestData
        ).then((resp) => {
            const {data} = resp;
            console.log(resp)
            if (data.result == 'success') {
                Swal.fire({
                    icon: 'success',
                    text: '수정 완료'
                }).then(()=>{   navigate(-1)})
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
                <h2 className=' fw-bold'>영화 수정하기</h2>
                <label htmlFor='title'>제목</label>
                <InputBase name='title' change={onChange} value={state.title}/>
                <label htmlFor='genre'>장르</label>
                <InputBase name='genre' change={onChange} value={state.genre}/>
                <label htmlFor='releaseDate'>개봉일</label>
                <Form.Control type='date' name='releaseDate' value={state.releaseDate} onChange={onChange}/>
                내용
                <InputBase name='content' change={onChange} value={state.content}/>
                <Button variant='primary' onClick={onUpdate}>작성</Button>
            </div>
        </>
    );
}

export default UpdateMoviePage;