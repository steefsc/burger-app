import React from 'react';
import classes from './Order.css';

const order = (props) => {
    //const ingredients = props.ingredients.map(ingredientKey => {
    //    return <p>{ingredientKey}: {props.ingredients[ingredientKey]}</p>
    //})

    const ingredients = [];
    for (let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amout: props.ingredients[ingredientName]
        })
    }

    const ingredientsOuput = ingredients.map(ingredient => {
        return <span 
                    style={{
                                textTransform: 'capitalize',
                                display: 'inline-block', 
                                margin: '0 8px', 
                                padding:'5px',
                                border: '1px solid #ccc'}
                            }
                    key={ingredient.name}>{ingredient.name} ({ingredient.amout})</span>
    })

    
    return (
        <div className={classes.Order}>
            <p>Ingredientes: {ingredientsOuput}</p>
            <p>Price: <strong>S./ {(props.price) ? props.price.toFixed(2) : 0.00}</strong></p>
        </div>
    )
};

export default order;