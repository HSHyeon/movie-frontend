import {Button, Form} from "react-bootstrap";
import {Role} from "../components/user/User.type.ts";
import Header from "../components/Header.tsx";


function UpdateRolePage() {
    const role = localStorage.getItem('role')
    const updateRole = () =>{

    }
    return (
        <>
            <Header/>
            <div className="d-grid gap-2">
                등업
                <Form.Select aria-label="select rolee">
                    {role == Role.user && <option value={Role.critic}>평론가</option>}
                    <option value={Role.admin}>관리자</option>
                </Form.Select>
                <Button onClick={updateRole}>신청하기</Button>
            </div>
        </>
    );
}

export default UpdateRolePage;