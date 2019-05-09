import React from 'react';
import { Card,Loader,Dimmer } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import ProductService from '../Services/ProductService';


class Landing extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            products : [],
            isLoading : false
        }
    }

    async componentDidMount() {
        this.setState({isLoading:true});
        var result = await ProductService.getProductList();
        this.setState({products:result,isLoading:false});
    }

    render() {
        return (
            <div style={{padding:'40px'}}>  
            <Card.Group
            itemsPerRow = {5}>
                {this.state.products.map((product) => {
                    return (<Card
                        key={product.id}
                        image={product.image}
                        header={product.name}
                        // eslint-disable-next-line no-useless-concat
                        description={"Price: " +`${product.price}`}
                        // eslint-disable-next-line react/jsx-no-undef
                        extra={<NavLink to={`/detail/${product.id}`} > View Detail</NavLink>}

                      />)
                })}
            </Card.Group>
            <Dimmer active={this.state.isLoading}>
                <Loader >Loading</Loader>
            </Dimmer>
            </div>
        )
    }

}


export default Landing;