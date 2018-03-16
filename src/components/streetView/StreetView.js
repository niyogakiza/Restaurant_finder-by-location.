/* eslint-disable no-undef */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators } from 'redux';
import { showStreetView} from "../../actions";
import {API_KEY} from "../../actions/Keys";

import './styles.css';

class StreetView extends Component{
    constructor(props){
        super(props);

        this.state = {
            xStart: 0,
            xEnd: 0,
            yStart: 0,
            yEND: 0
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    handleDragStart(ev){
        this.setState({
            xStart: ev.clientX,
            yStart: ev.clientY
        });
    }

    handleDragEnd(ev){
        this.setState({
            xEnd: ev.clientX,
            yEnd: ev.clientY
        })
    }

    handleClose(){
        const { showStreetView } = this.props;
        showStreetView(false);
    }

    render(){
        const { xStart, xEnd, yStart, yEnd } = this.state;
        const { streetview } = this.props;
        return(
            <div className="streetview">
                <div className="container">
                    <div className="content">
                        <svg
                            className="close"
                            onClick={this.handleClose}
                            fill="#fff"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            <path d="M0 0h24v24H0z" fill="none" />

                            <div className="navigation">
                                <i
                                    className="material-icons"
                                    onClick={() => this.setState({ xEnd: xEnd + 45 })}
                                >keyboard_arrow_left</i>
                                <i
                                    className="material-icons"
                                    onClick={() => this.setState({ xStart: xStart + 45 })}
                                >keyboard_arrow_right</i>
                            </div>
                        </svg>
                        <img
                            onDrag={this.handleDrag}
                            onDragEnd={this.handleDragEnd}
                            onDragStart={this.handleDragStart}
                            src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${streetview.geometry.location.lat()},${streetview.geometry.location.lng()}
                                &fov=90
                                &heading=${(xStart - xEnd) / 1.5}
                                &pitch=${(yEnd - yStart) / 2.5}
                                &key=${API_KEY}`}
                                alt={streetview.name}
                        />
                        <div className="navigation">
                            <i
                                className="material-icons"
                                onClick={() => this.setState({ xEnd: xEnd + 45 })}
                            >keyboard_arrow_left</i>
                            <i
                                className="material-icons"
                                onClick={() => this.setState({ xStart: xStart + 45 })}
                            >keyboard_arrow_right</i>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return { streetview: state.streetview };
};

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
        showStreetView: showStreetView
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(StreetView);