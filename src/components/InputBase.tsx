import {ChangeEvent} from 'react';
import {Form} from "react-bootstrap";

type InputBaseProps = {
    name: string;
    value?: string;
    type?: string;
    placeholder?: string;
    change: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputBase = ({name, value, change, placeholder, type}: InputBaseProps) => {
    return (
        <Form.Control name={name} type={type} placeholder={placeholder} onChange={change} value={value}/>
    );
};

export default InputBase;
