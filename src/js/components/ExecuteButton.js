import React from "react";


export default class ExecuteButton extends React.Component {



    render() {
        return (
            <input type="button" value="実行！" onClick={this.props.push} />
        );
    }
}