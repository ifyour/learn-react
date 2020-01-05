import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`)
    }

    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <div id="user-card">
                {
                    this.props.userList.map(v => (
                    v.avatar ? <Card key={v._id} onClick={ ()=>this.handleClick(v) }>
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
            </div>
        )
    }
}

export default UserCard