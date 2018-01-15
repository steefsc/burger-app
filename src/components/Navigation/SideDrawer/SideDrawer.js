import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';


const sideDrawer = (props) => {
    
    let attchedClasses = [classes.SideDrawer, classes.Close];
    if (props.open){
        attchedClasses = [classes.SideDrawer, classes.Open];
    } 

    return (
        <Aux>
            <BackDrop show={props.open} click={props.closed}/>
            <div className={attchedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;