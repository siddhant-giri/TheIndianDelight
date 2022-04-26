import { SET_ADDRESS, SET_LOADING, SET_PRODUCT, SET_SINGLE_PRODUCT, UPDATE_ADDRESS, UPDATE_PRODUCT, VIEW_SINGLE_PRODUCT } from "./action.types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return action.payload == null ? 
            {...state, products : []} : 
            {...state, products : action.payload};
        case SET_LOADING: 
            return {...state, isLoading : action.payload};    
        case UPDATE_PRODUCT:
            return {...state, productToUpdate  :action.payload, productToUpdateKey : action.key}
        case SET_SINGLE_PRODUCT:
            return{...state, product : action.payload}  
        case VIEW_SINGLE_PRODUCT:
            return{...state, product : action.payload} 
        case SET_ADDRESS:
            return action.payload == null ? {...state, addresses : []} : {...state, addresses : action.payload};
        case UPDATE_ADDRESS:
            return {...state, addressToUpdate : action.payload, addressToUpdateKey : action.key}             
        default:
            return state;
    }
}