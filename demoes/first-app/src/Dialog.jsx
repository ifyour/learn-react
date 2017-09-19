// src/Dialog.jsx
import React, { Component } from 'react';

const Dialog = (props) => {
    const { message, close } = props;
    return (
        <div className="dialog-backdrop">
            <div className="dialog-container">
                <div className="dialog-header">提示</div>
                <div className="dialog-body">{message}</div>
                <div className="dialog-footer">
                    <button className="btn" onClick={close}>确定</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog;