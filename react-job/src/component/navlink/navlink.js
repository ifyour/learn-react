import React from 'react';
import PropType from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class NavLink extends React.Component {
    static PropType = {
        data: PropType.array.isRequired
    }

    render() {
        const navList = this.props.data.filter( v => !v.hide) // 过滤掉隐藏的 NavBar
        const { pathname } = this.props.location
        return (
           <TabBar>
               {
                   navList.map(v =>(
                        <TabBar.Item 
                            key={ v.path }
                            title={ v.text }
                            icon={{ uri: require(`./navimg/${v.icon}.png`) }}
                            selectedIcon={{ uri: require(`./navimg/${v.icon}_select.png`) }}
                            selected={ pathname == v.path }
                            onPress={ ()=> this.props.history.push(v.path) }
                        ></TabBar.Item>
                   ))
               }
           </TabBar>
        )
    }
}

export default NavLink;