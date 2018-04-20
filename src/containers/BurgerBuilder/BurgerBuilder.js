import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false, 
        initialError: false
    }


    componentDidMount = () => {
       /* axios.get('/ingredients.json') 
            .then(response => {
                this.setState({
                    ingredients: response.data,
                })
            })
            .catch(error => {
                this.setState({
                    initialError: true,
                })
            })*/
    }


    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        
            return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        //alert("You Continue");
        this.props.history.push('/checkout');

    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.initialError ? <p>Algo paso, error de conexion</p> : <Spinner/>;

        if (this.props.ingredients){
             burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls ingredientAdded={this.props.onAddIngredient} 
                        ingredientRemoved={this.props.onRemoveIngredient} 
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                            ingredients={this.props.ingredients} 
                            purchaseCancel={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}
                            price={this.props.totalPrice}/>;
            
        }

        if (this.state.loading){
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} click={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
        onRemoveIngredient: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName}),

    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));