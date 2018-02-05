import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import classes from './Orders.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state = {
        orders: [],
        loading: false,
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(response => {
                let fetchedOrders = [];
                if (response && response.data){
                    for (let key in response.data){
                        fetchedOrders.push({
                            ...response.data[key],
                            id: key,
                        })
                    }

                    this.setState({
                        orders: fetchedOrders,
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })

    }

    render (){
        const orders = this.state.orders.map((order) => <Order key={order.id} ingredients={order.ingredients} price={+order.price}></Order>)
        return (
            <div className={classes.Orders}>
                {orders}
            </div>
        )
    }

};

export default withErrorHandler(Orders, axios);