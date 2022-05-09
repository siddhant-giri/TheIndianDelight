import { SET_LOADING, SET_PRODUCT, SET_SINGLE_PRODUCT, UPDATE_PRODUCT, VIEW_SINGLE_PRODUCT } from "./action.types";

// reducer for on which action what function will be performed
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
        default:
            return state;
    }
}