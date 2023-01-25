import React, {useState, FC} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import Form from 'react-bootstrap/Form';



interface FormProps{
    handleClick: (event: React.FormEvent, email: string, password: string, repeatPassword: string, setEmailError: any, setPasswordError: any) => void
    load: boolean
}

const FormRegistration: FC<FormProps> = ({handleClick, load}) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('') 
    const [passwordError, setPasswordError] = useState<string>('') 



    return (
        <Form onSubmit={(event) => handleClick(event, email, password, repeatPassword, setEmailError, setPasswordError)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)} 
                    type="email" 
                    placeholder="Enter email" 
                    />
                <Form.Text className="text-muted">
                    {emailError}
                </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
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
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                value={repeatPassword} 
                onChange={(event) => setRepeatPassword(event.target.value)} 
                type="password" 
                placeholder="Password" 
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

export default FormRegistration;