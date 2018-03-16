import { createStore, combineReducers } from 'redux';
import * as reducer  from './reducers/index'

export default () =>{
    const store = createStore(
        combineReducers({
            places: reducer.places,
            streetview: reducer.streetview,
            newReview: reducer.newReview,
            sampleResto: reducer.sampleResto


        })
    );
    return store;
}