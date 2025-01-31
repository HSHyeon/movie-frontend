import { ChangeEvent } from 'react';
import {Form} from "react-bootstrap";

type InputBaseProps = {
    name: string;
    value?: string;
    change: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputBase = ({ name,value, change } : InputBaseProps) => {
    return (
            <Form.Control name={name} onChange={change}  value={value}/>
    );
};

export default InputBase;
