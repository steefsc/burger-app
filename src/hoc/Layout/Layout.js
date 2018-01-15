import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    sideDrawerCloseHandler = () => {
        this.setState({
             showSideDrawer: false,
        })
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
             return {showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render () {
        return (
            <Aux>
                <Toolbar menuClick={this.toggleSideDrawerHandler}/>
                <SideDrawer closed={this.sideDrawerCloseHandler}
                            open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;