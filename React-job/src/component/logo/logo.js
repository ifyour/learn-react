import React from 'react';
import LogoImg from './job.png';
import './logo.css';

class Logo extends React.Component {
    render(){
        return (
            <div className="logo-container">
                <img src={ LogoImg } alt="logo" />
            </div>
        )
    }
}

export default Logo;