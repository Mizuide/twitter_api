//サーバサイドにリクエストを送出する関数コンポーネント
import React, { useState } from "react";
import axios from 'axios';


const 










const POSTRequest = (reqBody) => {
    let tweetData = [];
    axios.create().post(DOMAIN, reqBody).then(res => tweetData = res.data).then(res => {
        return tweetData
    })
}

let setInterSection = (tweetData) => {

    let options = {
        root: null,
        rootMargin: "10%",
        threshold: 1.0
    }

    let observer = new IntersectionObserver(renderTweet(tweetData,10), options);
    let target = document.querySelector('#footer');
    observer.observe(target);
}

let renderTweet = function(props) {

    let start = 0;
    let end = props.count;
    let display = [];
    let closerTweetData = props.tweetData;

    let retFunction = function () {
        if (this.state.complete || start === 0) {
            const eventReadStart = new CustomEvent('readStart', {
                bubbles: true,
            });
            window.dispatchEvent(eventReadStart);
            closerTweetData.map((data, index) => {
                if (start <= index && index < props.count) {
                    let id = data.id_str;
                    display.push(
                        <div className="indicator" key={index}>
                            <TweetBox id={id} />
                        </div>
                    );

                }
            }
            )
            end += props.count;
            start += props.count;
            this.displayTweetList(display);
        }
    }
    return retFunction;
}
