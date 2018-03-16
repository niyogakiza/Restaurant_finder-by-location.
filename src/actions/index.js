export const addReview = (text, rating, pid) =>{
    return{
        type: 'ADD_REVIEW',
        payload:{
            comment: text,
            rating: rating,
            place_id: pid
        }
    }
};

export const addRestaurant = (restaurant) =>{
    return{
        type: 'ADD_RESTAURANT',
        payload: restaurant
    }
};

export const showStreetView = isStreetView =>{
    return{
        type: 'STREETVIEW',
        payload: isStreetView
    }
};

export const dispatchPlaces = places =>{
    return{
        type: 'PLACES',
        payload: places
    }
};

export const showCreateRestaurant = ( showComponent = false ) =>{
    return{
        type: 'TOGGLE_RESTAURANT',
        payload: showComponent
    }
};