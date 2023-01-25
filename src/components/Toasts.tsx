import React, {FC, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

interface IToast {
    message: string;
}

const BasicExample: FC<IToast> = ({message}) => {

    return (
        <ToastContainer className="p-3" position={'bottom-end'}>
        <Toast>
            <Toast.Header closeButton={false}>
            <strong className="me-auto">Message</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
   
    );
  }
  

export default BasicExample;