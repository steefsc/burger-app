import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label: 'Salad',
        type: 'salad',
    },
    {
        label: 'Meat',
        type: 'meat',
    },
    {
        label: 'Cheese',
        type: 'cheese',
    },
    {
        label: 'Bacon',
        type: 'bacon',
    },
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Precio: S./ {props.price.toFixed(2)}</p>
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
            ))}
            <button className={classes.OrderButton} 
                    disabled={!props.purchaseable}
                    onClick={props.ordered}>ORDENAR AHORA</button>
        </div>
    )
};

export default buildControls;