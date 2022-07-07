import axios from 'axios'

class EAuctionDataService {
    retrieveAllBids(productId) {
        //console.log('executed service')
        return axios.get(`https://02k3bnf8ah.execute-api.us-west-2.amazonaws.com/e-auction/api/v1/seller/show-bids/${productId}`);
    }

    }


export default new EAuctionDataService()