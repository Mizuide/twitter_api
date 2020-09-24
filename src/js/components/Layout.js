import React from "react";
import axios from 'axios';

import Inputzone from "./InputZone";
import ExecuteButton from "./ExecuteButton";
import ResultZone from "./ResultZone";
import TweetBox from './TweetBox';

export default class Layout extends React.Component {

    constructor() {
        super();
        this.state = {
            userId: '@id',
            tweetList: [
            ],
            complete: false
        };


    }

    componentDidMount() {
        window.addEventListener('readStart', () =>
            this.setState({ complete: false })
        )

        window.addEventListener('readComplete', () =>
        
            this.setState({ complete: true })
        );

    }
    displayTweetList(display) {
        this.setState({
            tweetList: display
        })
    }

    writeId(e) {
        const value = e.target.value
        this.setState({ userId: value })
    }


    takeTenTweet(tweetData) {

        let start = 0;
        let count = 10;
        let display = [];
        let closerTweetData = tweetData;
        let retFunction = function () {
            if (this.state.complete || start === 0) {
                const eventReadStart = new CustomEvent('readStart', {
                    bubbles: true,
                });
                window.dispatchEvent(eventReadStart);
                closerTweetData.map((data, index) => {
                    if (start <= index && index < count) {
                        let id = data.id_str;
                        display.push(
                            <div className="indicator" key={index}>
                                <TweetBox id={id} />
                            </div>
                        );

                    }
                }
                )
                count += 10;
                start += 10;
                this.displayTweetList(display);
            }
        }.bind(this);
        return retFunction;
    }


    executeButtonPush() {
        let tweetData = [];
        axios.create().post(DOMAIN,this.state).then(res => tweetData = res.data).then(res => {

            let options = {
                root: null,
                rootMargin: "10%",
                threshold: 1.0
            }
            this.takeTenTweet(tweetData);
            let observer = new IntersectionObserver(this.takeTenTweet(tweetData), options);
            let target = document.querySelector('#footer');
            observer.observe(target);
        });
    };


    render() {
        return (
            <div>
                <h1>ツイートを人気順にソート ver0.1</h1>
                <Inputzone writeId={this.writeId.bind(this)} />
                <ExecuteButton push={this.executeButtonPush.bind(this)} />
                <ResultZone tweetList={this.state.tweetList} />
                <div id="footer"></div>
            </div>
        );
    }

}
