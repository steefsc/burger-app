import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const ingredientSummary =  Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                        <span style={{ textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                   </li>;
        });

    return (
        <Aux>
            <h3>Tu Ordern</h3>
            <p>Tu Deliciosa hamburgesa contiene: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Precio: </strong>{props.price.toFixed(2)}</p>
            <p>Continuar con la compra?</p>
            <Button buttonType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;