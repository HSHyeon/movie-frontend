import {Button, Form} from "react-bootstrap";
import {Role} from "../components/user/User.type.ts";
import Header from "../components/Header.tsx";
import {axiosInstance} from "../global/axiosInstance.ts";
import {useState} from "react";
import Swal from "sweetalert2";


function UpdateRolePage() {
    const role = localStorage.getItem('role')
    const [selectedRole, setSelectedRole] = useState<string>(Role.critic); // 기본 선택 값

    const updateRole = () =>{
        const params = new URLSearchParams();
        params.append("newRole", selectedRole);
        axiosInstance.post(`/user/role`, params).then((resp) => {
            const {data} = resp;
            console.log(data)
            if (data.result == 'success') {
                Swal.fire({
                    icon: 'success',
                    text: '등업이 완료되었습니다'
                })
                localStorage.setItem('role',data.authority)
            } else {
                Swal.fire({
                    icon: 'error',
                    text: data.message
                })
            }
        })
    }
    return (
        <>
            <Header/>
            <div className="d-grid gap-2 text-start">
                <h4 className="fw-bolder">등업 신청</h4>
                <Form.Select aria-label="select rolee"  onChange={(e) => setSelectedRole(e.target.value)}>
                    {role == Role.user && <option value={Role.critic}>평론가</option>}
                    <option value={Role.admin}>관리자</option>
                </Form.Select>
                <Button onClick={updateRole}>변경</Button>
            </div>
        </>
    );
}

export default UpdateRolePage;