import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '',
        email:'',
        address: {
            street: '',
            postalCode: '',
        },
    loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients, 
            price: this.props.price,
            customer: {
                name: 'Steef Sheen',
                address: {
                    street: 'Test 1',
                    zipCode: '4123',
                    countre: 'Peru'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest', 
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

    render (){
        let form = (
             <form>
                <input className={classes.Input} type="text" name="name" placeholder="Nombre"/>
                <input className={classes.Input} type="email" name="email" placeholder="Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Calle"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Codigo Postal"/>
                <Button buttonType="Success" clicked={this.orderHandler} >ORDER</Button>
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

export default ContactData; 