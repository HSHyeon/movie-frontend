import {useReducer} from "react";
import Swal from 'sweetalert2'
import {Button} from "react-bootstrap";
import {UserReducer} from "../reducers/UserReducer.tsx";
import {useNavigate} from "react-router";
import {PATH} from "../global/constants.ts";
import {UserType} from "../components/user/User.type.ts";
import {axiosInstance} from "../global/axiosInstance.ts";
import InputBase from "../components/InputBase.tsx";

const initialState: UserType =
    {
        username: '',
        password: ''
    }

function LoginPage() {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(UserReducer, initialState)
    const {username, password} = state

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        dispatch({
            type: "ON_CHANGE",
            payload: {name, value},
        });
    };
    const onLogIn = () => {
        axiosInstance.post('/user/auth', state).then((resp) => {
            const {data} = resp;
            console.log(resp)
            if (data.result == 'success') {
                localStorage.setItem('role', data.authority)
                localStorage.setItem('id', data.id)
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
        <div className="d-grid gap-2">
            <InputBase name='username' placeholder='아이디' value={username} change={onChange}/>
            <InputBase type='password' placeholder='비밀번호' name='password' value={password} change={onChange}/>
            <div style={{display: 'flex', gap: '5px'}}>
                <Button variant="primary" onClick={onLogIn}>로그인</Button>
                <Button variant="secondary" onClick={() => {
                    navigate(PATH.register)
                }}>회원가입</Button>
            </div>
        </div>
    );
}

export default LoginPage