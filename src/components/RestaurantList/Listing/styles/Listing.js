import React, { Component } from 'react'
import { connect } from 'react-redux'
import restaurant from '../../../../helpers/SampleResto';


import Model from '../../ModalResto';
import Filter from '../Filter'
import './listing.css'

class Listing extends Component{
    constructor(props){
        super(props);

        this.state = {
            filter: 3,
            restaurant: restaurant
        };
        this.updateFilter = this.updateFilter.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const { restaurant } = this.state;
        if(Object.keys(nextProps.sampleResto)[0]){
            const restaurantClone = [...restaurant];

            restaurantClone.unshift(nextProps.sampleResto);
            this.setState({ restaurant: restaurantClone });
        }
    }

    updateFilter(value){
        this.setState({ filter: value });
    }

    render(){
        const { places, userLocation } = this.props;
        const { filter, restaurant } = this.state;

        return(
            <div className="sidebar">
                <Filter update={this.updateFilter} />
                {places[0] && places.map((place, i) =>{
                    if(place.rating >= filter){
                        return <Model place={place} userLocation={userLocation} key={i}/>
                    }
                    return null;
                })}
                {restaurant[0] && restaurant.map((place, i) =>{
                    if(place.rating >= filter || place.rating === null){
                        return <Model place={place} userLocation={userLocation} key={i}/>
                    }
                    return null;
                })}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return { sampleResto: state.sampleResto };
};

export default connect(mapStateToProps)(Listing);

