import React from 'react';
import { Grid, List } from 'antd-mobile';

class AvatarSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const avatarList = 'Ahri,Akali,Ashe,Fiora,Gangplank,Garen,JarvanIV,Jayce,Karma,Katarina,LeeSin,Vayne,Vi,XinZhao,Blitzcrank'
            .split(',')
            .map(v => ({
                icon: require(`../images/${v}.png`),
                text: v
            }))
        return (
            <div>
                <Grid data={ avatarList } 
                    columnNum="5" 
                    onClick={ elem => this.props.avatarSelector(elem.text) }
                />
            </div>
        )
    }
}

export default AvatarSelector;