import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';




const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 1.0,
    cheese: 1.3,
    meat: 2,
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false, 
        initialError: false
    }


    componentDidMount = () => {
        axios.get('/ingredients.json') 
            .then(response => {
                this.setState({
                    ingredients: response.data,
                })
            })
            .catch(error => {
                this.setState({
                    initialError: true,
                })
            })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }


    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        
            this.setState({purchaseable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        //alert("You Continue");
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Steef Sheen',
                address: {
                    street: 'Las Orquideas',
                    zipCode: '04',
                    country: 'Peru'
                },
                email: 'steefsheen@gmail.com',
            },
            deliveryMethod: 'fastest',
        }
        this.setState({loading: true});

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            });

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.initialError ? <p>Algo paso, error de conexion</p> : <Spinner/>;

        if (this.state.ingredients){
             burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients} 
                            purchaseCancel={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}
                            price={this.state.totalPrice}/>;
            
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

export default withErrorHandler(BurgerBuilder,axios);