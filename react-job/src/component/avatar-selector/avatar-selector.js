import React from 'react';
import PropTypes from 'prop-types';
import { Grid, List } from 'antd-mobile';

class AvatarSelector extends React.Component {
    static propTypes = {
        avatarSelector: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const avatarList = 'Ahri,Akali,Ashe,Fiora,Gangplank,Garen,JarvanIV,Jayce,Karma,Katarina,LeeSin,Vayne,Vi,XinZhao,Blitzcrank'
            .split(',')
            .map(v => ({
                icon: require(`./images/${v}.png`),
                text: v
            }))
        const gridHead = this.state.text
                        ? (
                            <div>
                                <span>已选择头像: </span>
                                <img style={{ width: 20 }} src={ this.state.icon } alt="icon"/>
                            </div>
                        )
                        : '请选择头像'
        return (
            <List renderHeader={ ()=> gridHead }>
                <Grid data={ avatarList } 
                    columnNum="5" 
                    onClick={ elem => {
                        this.setState(elem)
                        this.props.avatarSelector(elem.text)
                    } }
                />
            </List>
        )
    }
}

export default AvatarSelector;