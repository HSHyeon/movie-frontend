import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useReducer} from "react";
import {MovieReducer} from "../reducers/MovieReducer.tsx";
import {PATH} from "../global/constants.ts";
import Swal from "sweetalert2";
import {axiosInstance} from "../global/axiosInstance.ts";
import Header from "../components/Header.tsx";
import {MovieInputType} from "../components/movie/Movie.type.ts";

const initialState: MovieInputType = {
    imageUrl: "",
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
    const validate = () =>{
        const requiredFields = {
            title: "제목을 입력하세요.",
            genre: "장르를 입력하세요.",
            releaseDate: "개봉일을 선택하세요.",
            content: "내용을 입력하세요."
        };

        for (const [key, message] of Object.entries(requiredFields)) {
            if (!state[key]?.toString().trim()) {
                Swal.fire({ icon: "warning", text: message })
                return false;
            }
        }
        return true;
    }

    const onWrite = () => {
        if(!validate()) return
        axiosInstance.post('/movie/write', state).then((resp) => {
            const {data} = resp;
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
                <Form.Control name='title' placeholder="제목" onChange={onChange}/>
                <label htmlFor='imageUrl'>포스터</label>
                {/*TODO 이미지 s3 업로드*/}
                <Form.Control name='imageUrl' type='file' onChange={onChange} disabled/>
                <Form.Control name='imageUrl' placeholder="이미지url" onChange={onChange} />
                <label htmlFor='genre'>장르</label>
                <Form.Control name='genre' onChange={onChange}/>
                <label htmlFor='releaseDate'>개봉일</label>
                <Form.Control type='date' name='releaseDate' onChange={onChange}/>
                내용
                <Form.Control as="textarea" name='content'onChange={onChange}/>
                <Button variant='primary' onClick={onWrite}>작성</Button>
            </div>
        </>
    );
}

export default WriteMoviePage;