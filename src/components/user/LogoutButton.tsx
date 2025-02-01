import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../global/axiosInstance.ts";

function LogoutButton() {
    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.clear()
        axiosInstance.get('/user/logout').then(() => {
            navigate('/')
        })
    }
    return (
        <Button variant="secondary" onClick={onLogout}>로그아웃</Button>
    );
}

export default LogoutButton;