// src/Button.jsx
import React from 'react';

const Button = (props) => {
    const { children, loading, submit } = props
    return (
        <button onClick={submit} disabled={loading ? 'disabled' : null}>
            {loading && <i className="loading"></i>}
            {children}
        </button>
    )

}

export default Button;