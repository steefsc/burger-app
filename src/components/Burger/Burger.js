import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    let ingredientsArray = Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_, index) => {
            return <BurgerIngredient key={igKey + index} type={igKey} />
        });
    })
    .reduce((arr,el) => {
        return arr.concat(el);
    },[]);

    if (ingredientsArray.length === 0){
        ingredientsArray = <p>Ingresa algun ingrediente porfavor</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientsArray}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);