import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { addReview } from '../../actions/index'



class UserReview extends Component{
    constructor(props){
        super(props);

        this.state = {
            text: '',
            rating: 3
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const { text, rating } = this.state;
        const { addReview, pid } = this.props;

        if(text && rating ){
            addReview(text, Number(rating), pid);
            this.setState({ text: '', rating: 3});
        }
    }

    handleChange(e){
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    }

    render() {
        const {text, rating} = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="text"
                       value={text}
                       type="text"
                       onChange={this.handleChange}
                       placeholder="Add your review"
                />
                <select
                    onChange={this.handleChange}
                    name="rating"
                    value={rating}
                >
                    <option value="1">1 star</option>
                    <option value="2">2 star</option>
                    <option value="3">3 star</option>
                    <option value="4">4 star</option>
                    <option value="5">5 star</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        )
    }

}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
    addReview: addReview
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(UserReview);