import React from "react";
import ReactDOM from "react-dom";
export default class ResultZone extends React.Component {

    render() {
        return (
            <div className="resultZone">
                {this.props.tweetList}
            </div>
        );
    }
}