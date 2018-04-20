import React,{Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nombre',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Direccion',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },

            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Codigo Postal',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },

            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pais',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayedValue: 'El mas rapido'},
                        {value: 'cheapest', displayedValue: 'El mas barato'},
                    ]
                },
                value: '',
                touched: false,
                valid: true,
            },

        },
        loading: false,
        formIsValid: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});

        const formData = {};

        for (let forElementId in this.state.orderForm){
            formData[forElementId] = this.state.orderForm[forElementId].value;
        }



        const order = {
            ingredients: this.props.ingredients, 
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
             .then(response => {
                 //console.log(response);
                 this.setState({loading: false, purchasing: false});
                 this.props.history.push('/');
             })
             .catch(error => {
                 console.log(error);
                 this.setState({loading: false, purchasing: false});
             });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event.target.value);

        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;


        let formIsValid = true;
        for (let inputIdentidiers in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentidiers].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }


    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return isValid;
        }

        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render (){
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (
             <form onSubmit={this.orderHandler}>
                {formElementsArray.map( formElement => {
                    return (
                        <Input 
                            key={formElement.id}
                            changed={(event) => this.inputChangedHandler(event,formElement.id)}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            invalid={!formElement.config.valid}
                            shouldValidate = {formElement.config.validation}
                            touched = {formElement.config.touched}
                            value={formElement.config.value}/>
                    )
                })}
                <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )

        if (this.state.loading){
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Porfavor ingresa los datos de Contacto</h4>
                {form}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData); 