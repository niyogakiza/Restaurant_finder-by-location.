import React from 'react'


export default function Stars(props){
    const rating = props.rating;

    return(
        <div className="stars">
            {Array(Math.floor(rating, 10)).fill(1).map((star, i) => {
                return <i className="material-icons"  style={{color:"orangered"}} key={i}>star</i>
            })}
            {(rating - Math.floor(rating, 10)) !== 0}
            <i className="material-icons" style={{color:"orangered"}}>star_half</i>
        </div>
    );
}