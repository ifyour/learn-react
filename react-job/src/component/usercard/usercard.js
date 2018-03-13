import React from 'react';
import PropTypes from 'prop-types';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';

class UserCard extends React.Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
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
                                        { v.description.split('\n').map(d => (<div key={d}>{ d }</div>)) }
                                        { v.money ? <div>{ v.money }</div> : null }
                                        { v.company ? <div>{ v.company }</div> : null }
                                    </Body>
                                </Card>
                            : null
                    ))
                }
             </WingBlank>
        )
    }
}

export default UserCard