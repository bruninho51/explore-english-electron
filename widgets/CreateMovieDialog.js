import React from 'react'
import '../assets/css/Dialog.css'
import '../assets/css/Swing.css'
import { Button } from './Button'
import styled from "styled-components"

const DialogContainer = ({ children, onClick }) => {
    return (
        <div onClick={onClick} class="dialog-container" id="dialog-container" >
            {children}
        </div>
    )
}

const TextInputStyle = styled.input`
    border-color: transparent;
    border: 1px solid black;
    font-family: Roboto sans-serif;
    height: 30px;
    border-radius: 10px;
    width: 400px;
    padding: 0px 20px 0px 20px;
    text-align: center;
`

const TextInputContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    font-family: Roboto sans-serif;
    font-size: 16px;
`

const TextInput = ({ type, name, label }) => {
    return (
        <TextInputContainer>
            <Label>{`${label}:`}</Label>
            <TextInputStyle type={type} name={name} />
        </TextInputContainer>
    )
}

const Form = styled.form`
    display: flex;
    justify-content: center;
`

const Header = styled.div`
    margin: 0px 0px 20px 0px;
`

export const CreateMovieDialog = ({ onCancel, onSave }) => {
    
    const dialogRef = React.createRef();

    const swingAnimation = () => {
        const dialog = dialogRef.current;
        dialog.classList.remove('swing-animation');
        setTimeout(() => {
            dialog.classList.remove('swing-animation');
            dialog.classList.add('swing-animation');
        }, 100);
    }

    return (
        <DialogContainer onClick={swingAnimation} >
            <div ref={dialogRef} class="dialog" id="dialog" onClick={e => e.stopPropagation()} style={{ 
            width: '500px',
            height: '90vmin' }}>
                <Header>
                    <h1 id="dialog-title">Create a New Movie</h1>
                </Header>
                <div class="body" id="dialog-body">
                    <Form>
                        <TextInput type="text" name="name" label="Name" />
                    </Form>
                </div>
                <footer>
                    <Button theme="danger" style={{ marginRight: '5px' }} onClick={onCancel}>Cancel</Button>
                    <Button theme="success" onClick={onSave}>Save</Button>
                </footer>
            </div>
        </DialogContainer>
    )
}