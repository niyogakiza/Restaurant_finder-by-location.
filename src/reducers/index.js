export const places = (state = [], action) =>{
    return action.type === 'PLACES' ? action.payload : state;
};


export const restaurant = (state = {}, action) =>{
    return action.type === 'ADD_RESTAURANT' ? action.payload : state;
};

export const streetview = ( state = false, action) =>{
    return action.type === 'STREETVIEW' ? action.payload : false;
};


export const newReview = (state = false, action) =>{
    return action.type === 'ADD_REVIEW' ? action.payload : state;
};


export const sampleResto = (state = false, action) =>{
    return action.type === 'TOGGLE_RESTAURANT' ? action.payload : state;
};