import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import GoogleMap from "./components/map/GoogleMap";
import Listing from "./components/RestaurantList/Listing/styles/Listing";
import StreetView from "./components/streetView/StreetView";
import CreateResto from "./components/createResto/CreateResto";
import './App.css';



class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            userLocation: null,
            isModalOpen: false
        };
    }

    componentDidMount(){
        const getPosition = position =>{
            this.setState({
                userLocation:{
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        };

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getPosition, handleError.bind(this));

            function handleError(error){
                if(error.code && error.PERMISSION_DENIED){
                    this.setState({
                        userLocation:{
                            lat:'48.8534100',
                            lng: '2.3488000'
                        }
                    })
                }
            }
        }

    }


    render(){
        const { userLocation } = this.state;
        const { places, streetview, showCreateRestaurant } = this.props;

        return(
            <Fragment>

                {streetview && !showCreateRestaurant && <StreetView/>}
                {showCreateRestaurant && !streetview && <CreateResto />}
                {/*<Autocomplete*/}
                    {/*style={{width: '90%'}}*/}
                    {/*onPlaceSelected={(place) => {*/}
                        {/*console.log(place);*/}
                    {/*}}*/}
                {/*/>*/}
                <GoogleMap
                    userLocation={userLocation}
                />
                <Listing
                    places={places}
                    userLocation={userLocation}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state =>{
    return{
        places: state.places,
        streetview: state.streetview,
        showCreateRestaurant: state.showCreateRestaurant
    }
};

export default connect(mapStateToProps)(App);