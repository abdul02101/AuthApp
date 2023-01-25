import React, {FC, useState} from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface PropsForm {
    handleClick: (event: React.FormEvent, password: string, newPassword:string, newRepatPassword: string, setPasswordError: any, setNewRepeatPasswordErr: any) => void
    load: boolean
}

const FormChangePassword:FC<PropsForm> = ({load, handleClick}) => {
    const [password, setPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [newRepatPassword, setNewRepeatPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('') 
    const [repeatNewPasswordErr, setNewRepeatPasswordErr] = useState<string>('')
    

    return (
        <Form onSubmit={(event) => handleClick(event, password, newPassword, newRepatPassword, setPasswordError, setNewRepeatPasswordErr)}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Old password</Form.Label>
                <Form.Control 
                value={password} 
                onChange={(event) => setPassword(event.target.value)}
                type="password" 
                placeholder="Password" 
                />
                <Form.Text className="text-muted">
                    {passwordError}
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New password</Form.Label>
                <Form.Control 
                value={newPassword} 
                onChange={(event) => setNewPassword(event.target.value)}
                type="password" 
                placeholder="Password" 
                />
                <Form.Text className="text-muted">
                    {repeatNewPasswordErr}
                </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control 
                value={newRepatPassword} 
                onChange={(event) => setNewRepeatPassword(event.target.value)}
                type="password" 
                placeholder="Repeat password" 
                />
            </Form.Group>
           
            <Button variant="primary" type="submit" disabled={load}>
                {load ? 
                    <>
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Loading...
                    </>
                    :
                    'Submit'
                }
            </Button>
        </Form>
    );
};

export default FormChangePassword;