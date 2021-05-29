import React from 'react'
import '../assets/css/Dialog.css'
import '../assets/css/Swing.css'

const DialogContainer = ({ children, onClick }) => {
    return (
        <div onClick={onClick} class="dialog-container" id="dialog-container">
            {children}
        </div>
    )
}

export const Dialog = ({ children, title, labelBtn1, labelBtn2, onClickBtn1, onClickBtn2 }) => {
    
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
        <DialogContainer onClick={swingAnimation}>
            <div ref={dialogRef} class="dialog" id="dialog" onClick={e => e.stopPropagation()}>
                <header>
                    <h1 id="dialog-title">{title}</h1>
                </header>
                <section class="body" id="dialog-body">{children}</section>
                <footer>
                    {labelBtn1 ? <input type="button" id="dialog-button1" onClick={onClickBtn1} value={labelBtn1} /> : <span />}
                    {labelBtn2 ? <input type="button" id="dialog-button2" onClick={onClickBtn2} value={labelBtn2} /> : <span />}
                </footer>
            </div>
        </DialogContainer>
    )
}