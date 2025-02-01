import React, {useReducer} from "react";
import {UserReducer} from "../reducers/UserReducer.tsx";
import Swal from "sweetalert2";
import {UserType} from "../components/user/User.type.ts";
import {Button, Form} from "react-bootstrap";
import {axiosInstance} from "../global/axiosInstance.ts";
import {useNavigate} from "react-router";
import {PATH} from "../global/constants.ts";

const initialState: UserType =
{
    username: '',
    password: '',
    nickname: '',
}

function RegisterPage() {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(UserReducer, initialState)
    const { username, password, nickname } = state
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch({
            type: 'ON_CHANGE',
            payload: { name, value },
        })
    }
    const onRegister = () => {
        axiosInstance.post('/user/register', state).then((resp) => {
            console.log(resp)
            const { data } = resp
            if (data.result == 'fail') {
                Swal.fire({
                    icon: 'error',
                    text: data.message
                })
            } else {
                Swal.fire({
                    icon: "success",
                    text: '회원가입에 성공했습니다.'
                }).then(() => {
                    navigate(PATH.root)
                })
            }
        })

    }
    return (
        <div className="d-grid gap-2 text-start">
            <h4 className="fw-bolder">회원가입</h4>
            <Form.Control placeholder='아이디' name='username' value={username} onChange={onChange} />
            <Form.Control placeholder='비밀번호' type="password" name='password' value={password} onChange={onChange} />
            <Form.Control placeholder='닉네임' name='nickname' value={nickname} onChange={onChange} />
            <Button onClick={onRegister}>가입하기</Button>
        </div>
    );
}

export default RegisterPage;