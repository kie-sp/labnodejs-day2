import axios from 'axios'

class ProductService {

    constructor() {
        this.URL = "http://localhost:3002"
    }

    async getProductList() {
        try {
            var result = await axios.get(this.URL+'/product/list');
            console.log(result.data)
            return result.data;
        } catch(err) {
            return err
        }
    }

    async getProductDetail(id) {
        try {
            var result = await axios.get(this.URL+'/product/'+id);
            console.log(result.data)
            return result.data;
        } catch(err) {
            return err
        }
    }

    async buyProduct(data) {
        var item = {
            name: data.name,
            address: data.address,
            product : data.product
        }
        try {
            var result = await axios.post(this.URL+'/product/',item);
            console.log(result.data)
            return result.data;
        } catch(err) {
            return err
        }
    }
}

export default new ProductService();