import axios from 'axios'

class EAuctionDataService {
    retrieveAllBids(productId) {
        //console.log('executed service')
        return axios.get(`http://54.214,122.197:8081/e-auction/api/v1/seller/show-bids/${productId}`);
    }

    }


export default new EAuctionDataService()