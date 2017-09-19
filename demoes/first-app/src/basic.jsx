import React from 'react';
import Addsss from './Addsss';

class basic extends React.Component {
    componentDidMount() {
        console.log(this.props.name);
    }
    render() {
        return (
            <div className={this.props.name}>{this.props.children}</div>
        )
    }
}

export default Addsss(basic);