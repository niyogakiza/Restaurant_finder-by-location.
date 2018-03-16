import React from 'react';
import resto from '../../images/resto.jpg';

export default function Image(props){
    const place = props.place;

    let photo;
    if(place.photos && place.photos[0]){
        photo = place.photos[0].getUrl({
            maxWidth: 1000,
            maxHeight: 1000
        })
    }

    return (
        <div className="card-image" style={{backgroundImage:`url(${photo || resto})` }}>

        </div>
    )
}