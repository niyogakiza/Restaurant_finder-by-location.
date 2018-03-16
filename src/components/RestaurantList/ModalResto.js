/* eslint-disable no-undef */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {showStreetView} from "../../actions";
import axios from 'axios';
import isEqual from 'lodash.isequal';
import Image from './image';
import UserReview from '../reviews/UserReview';
import Reviews from '../reviews/Reviews'
import Stars from './Stars';
import './Listing/styles/style.css';




class Model extends Component{
    constructor(props){
        super(props);

        this.state = {
            modelOpen: false,
            reviews: []
        };

        this.toggleStreetView = this.toggleStreetView.bind(this);
        this.toggleReviews = this.toggleReviews.bind(this);
        this.renderReviews = this.renderReviews.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const { place, newReview } = this.props;
        const { modelOpen, reviews } = this.state;

        if(!isEqual(nextProps.newReview, newReview) &&
        nextProps.newReview.place_id === place.place_id && modelOpen){
            const  reviewsClone = [...reviews];
            reviewsClone.unshift(nextProps.newReview);
            this.setState({ reviews: reviewsClone });
        }
        if(!isEqual(nextProps.places, place)){
            this.setState({ modelOpen: false, reviews: []});
        }
    }

    toggleStreetView(){
        const { streetview, showStreetView, place } = this.props;
        streetview ? showStreetView(false) : showStreetView(place);
    }

    toggleReviews(){
        const { modelOpen, reviews } = this.state;
        const { place } = this.props;

        this.setState({ modelOpen: !modelOpen});
        if(!modelOpen && place.rating && !reviews[0] && !place.sample){
            axios.post(`https://us-central1-food-around-ecfb3.cloudfunctions.net/mapDetails`,
                { q: place.place_id })
                .then(res =>{
                    if(res.data && res.data.result && res.data.result.reviews){
                        this.setState({ reviews: res.data.result.reviews });
                    }
                })
        } else if(!modelOpen && place.sample && !reviews[0]){
            this.setState({ reviews: place.rating })
        }
    }

    renderReviews(){
        const { modelOpen, reviews } = this.state;
        const { place } = this.props;
        if(modelOpen){
            if(reviews[0]){
                return(
                    <Fragment>
                        <UserReview pid={place.place_id}/>
                        <Reviews reviews={reviews} />
                    </Fragment>
                );
            }
            else if(!place.rating){
                return(
                    <div>
                        No Reviews for {place.name} yet
                       <UserReview pid={place.place_id}/>
                    </div>
                );

            }else if(!reviews[0]){
                return<p>Loading.....</p>
            }
        }
    }

    render(){
        const { place} = this.props;
        const { modelOpen } = this.state;
        const renderReviews = this.renderReviews();

        return(
            <div className="card">
                <Image place={place}/>

                <div className="card-text">
                    <h3 className="styles">{place.name}</h3>
                    {
                        place.rating && <Stars rating={place.rating} />
                    }
                    <p>Address: {place.vicinity}</p>
                    <button onClick={this.toggleStreetView}>Street View</button>
                    <button onClick={this.toggleReviews}>{modelOpen ? 'Hide' : 'Show'} Reviews</button>
                    {renderReviews}
                </div>
            </div>
        );
    }

}
const mapStateToProps = state =>{
    return { streetview: state.streetview, newReview: state.newReview }
};

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
        showStreetView: showStreetView
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Model);