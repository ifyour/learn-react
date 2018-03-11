import React from 'react';
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';

class Boss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        axios.get('/user/list?type=genius')
            .then(res => {
                if(res.status === 200) {
                   this.setState({
                       data: res.data.data
                   })
                }
            })
    }
    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                <WhiteSpace />
                {
                    this.state.data.map(v => (
                    v.avatar ? <Card key={ v._id } full>
                                    <Header 
                                        title={ v.user }
                                        thumb={ require(`../avatar-selector/images/${v.avatar}.png`) }
                                        extra={ <span>{ v.title }</span> }
                                    ></Header>
                                    <Body>
                                         { 
                                            v.description
                                            .split('\n')
                                            .map(v => (<div>{ v }</div>))
                                         }
                                    </Body>
                                </Card>
                            : null
                    ))
                }
            </WingBlank>
        )
    }
}


export default Boss