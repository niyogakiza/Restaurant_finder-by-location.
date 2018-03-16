import React from 'react';
import './css/reviews.css'

export default function Reviews(props){
    const reviews = props.reviews;

    return(
        <div className="reviews">
            {
              reviews.map((review, i) =>{
                return(
                    <div className="review" key={i}>
                        <div className="stars">
                            {Array(review.rating).fill(1).map((star, j) =>{
                                return <i className="material-icons" key={j}>star</i>
                            })}<br />
                        </div>
                        <p>{reviews.text}</p>
                    </div>
                );
            })}
        </div>
    );
}