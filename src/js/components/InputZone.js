import React from "react";


export default class InputZone extends React.Component {


    render() {
        return (
            <div>
                ユーザID<input type="text" onChange={this.props.writeId} size="10" ></input>のツイートを
                <div>
                    <input type="radio" name="sort" value="rt" checked="checked" />RT数順
                <input type="radio" name="sort" value="fav" />お気に入り数順
                </div>
                に並べる
            </div>
        );
    }
}