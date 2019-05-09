import React from 'react';
import { Form,Button, Grid, Image,Header,Modal,Loader,Dimmer } from 'semantic-ui-react'
import ProductService from '../Services/ProductService';

class Detail extends React.Component {
    

    state = {
        product : {},
        name : '',
        address : '',
        open : false,
        orderid : '',
        isLoading : false
    }

    async componentDidMount() {
        this.setState({isLoading:true});
        var result = await ProductService.getProductDetail(this.props.match.params.id);
        console.log(result)
        this.setState({product:result,isLoading:false})
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true })
        var result =  await ProductService.buyProduct(this.state);
        this.setState({open: true,orderid : result,isLoading:false})
    }

    handleChange = (event, label) => {
        var model = {};
        var value = event.target.value;
        model[label] = value;
        this.setState(model);
    }

    close = () => {
        this.setState({ open: false })
        this.props.history.push('/');
    }

    render() {
        const {product , name, address,open,isLoading} = this.state
        console.log(this.props.match.params.id)
        return (
            <div style={{padding:'40px'}}>  
            <Grid divided columns={2}>
            <Grid.Row >
            <Grid.Column Column width={4}>

            <Image src={product.image} size='medium' rounded />
            </Grid.Column>
            <Grid.Column Column width={8}>
                <Form onSubmit={this.handleSubmit} 
                className="needs-validation">
                <Header as='h2'>
                    <Header.Content>
                    {product.name}
                    <Header.Subheader>Price: {product.price}</Header.Subheader>
                    </Header.Content>
                </Header>
                <p>
                {product.description}
                </p>

                <Header as='h3'>
                <Header.Content>
                    Shipping Address:
                    </Header.Content>
                </Header>
                    <Form.Input
                        fluid
                        id='name'
                        label='Name'
                        placeholder='Name'
                        value = {name}
                        onChange={(event) => this.handleChange(event,'name')}
                        required
                    />
                    <Form.TextArea label='Address' 
                    onChange={(event) => this.handleChange(event,'address')} 
                    placeholder='Your address...' 
                    value = {address}
                    required
                    />
                    <Form.Group>
                        <Form.Button>Buy Now</Form.Button>
                        <Button onClick={(event) => {this.props.history.push('/')}}>Back</Button>
                    </Form.Group>
                    
                </Form>
            </Grid.Column>
            </Grid.Row>
            </Grid>
                <Modal size={'tiny'} open={open}>
                <Modal.Header>Thank You</Modal.Header>
                <Modal.Content>
                    <p>Your Order# {this.state.orderid} is now processing</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.close} positive icon='checkmark' labelPosition='right' content='Close' />
                </Modal.Actions>
                </Modal>
                <Dimmer active={isLoading}>
                    <Loader >Loading</Loader>
                </Dimmer>
            </div>
        )
    }

}


export default Detail;