import React, { Component } from 'react';

class Filter extends Component{
    constructor(props){
        super(props);

        this.state = {
            value: 1
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev){
        const { update } = this.props;

        this.setState({ value: ev.target.value });
        update(ev.target.value);
    }
    render(){
        const { value } = this.state;
        return(
            <div className="filter card">
                <span>Filter by Rating</span>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={value}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default Filter;