import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Definitivamente Deliciosa!</h1>
            <div style={{witdh: '100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button 
                buttonType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                buttonType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary; 