import React from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';

import { getUserList } from '../../redux/chatuser.redux';

@connect(
    state=>state.chatuser,
    { getUserList }
)
class Boss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.props.getUserList('genius');
    }
    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                <WhiteSpace />
                {
                    this.props.userList.map(v => (
                    v.avatar ? <Card key={v._id}>
                                    <Header 
                                        title={ v.user }
                                        thumb={ require(`../avatar-selector/images/${v.avatar}.png`) }
                                        extra={ <span>{ v.title }</span> }
                                    ></Header>
                                    <Body>
                                         { 
                                            v.description
                                                .split('\n')
                                                .map(v => (<div key={v}>{ v }</div>))
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