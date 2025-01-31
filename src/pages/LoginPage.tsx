import {useReducer} from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import {Button, Form} from "react-bootstrap";
import {UserReducer} from "../reducers/UserReducer.tsx";
import {useNavigate} from "react-router";
import {PATH} from "../global/constants.ts";
import {UserType} from "../components/user/User.type.ts";

const initialState: UserType =
    {
        inputs: {
            username: '',
            password: ''
        }
    }

function LoginPage() {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(UserReducer, initialState)
    const {username, password} = state.inputs

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        dispatch({
            type: "ON_CHANGE",
            payload: {name, value},
        });
    };
    const onLogIn = () => {
        axios.post('http://localhost:8080/api/user/auth', {
            username: username,
            password: password
        }, {
            withCredentials: true
        }).then((resp) => {
            const {data} = resp;
            console.log(resp)
            if (data.result == 'success') {
                localStorage.setItem('role',data.authority)
                localStorage.setItem('id',data.id)
                navigate(PATH.movie)
            } else {
                Swal.fire({
                    icon: 'error',
                    text: data.message
                })
            }

        }).catch((e) => {
            console.log(e)
            Swal.fire({
                icon: 'error',
                text: '로그인 정보를 다시 입력해주세요'
            })
        })
    }
    return (
        <div style={{display: 'grid', gap: '5px'}}>
            <Form.Control name='username' placeholder='아이디' value={username} onChange={onChange}/>
            <Form.Control type='password' placeholder='비밀번호' name='password' value={password} onChange={onChange}/>
            <div style={{display: 'flex', gap: '5px'}}>
                <Button variant="primary" onClick={onLogIn}>로그인</Button>
                <Button variant="secondary">회원가입</Button>
            </div>
        </div>
    );
}

export default LoginPage