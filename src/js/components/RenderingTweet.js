import React, { useEffect, useState } from "react";
import TweetEmbed from 'react-tweet-embed';

//tweetのレンダリングを行う関数コンポーネント
let useCount = function (up) {
    const [count, setCount] = useState(0);
    let countUp = () => setCount(c => c + up);
    return [count, countUp]
}
let useTweet = function (tweetData) {
    const [displayList, setDisplayList] = useState([]);
    const render = (end) => {
        setDisplayList(tweetData.map((data, index) => {
            if (index < end) {
                let id = data.id_str;
                return (<div className="indicator" key={index}>
                    <TweetBox id={id} />
                </div>)

            }
        }
        ));
    }
    return [displayList, render];

}
const Rendering = (props) => {
    const [tweetList, setTweetList] = useTweet(props.tweetList);
    useEffect(() => {
        setTweetList(props.count);
    }, [props]);

    return (
        <div className="indicator">
            {tweetList}
        </div>
    )
}


const TweetBox = (props) => {

    const [success, setSuccess] = useState(false)
    let onSuccess = () => {
        setSuccess(true);

        const eventReadComplete = new CustomEvent('readComplete', {
            bubbles: true,
        });

        let allSuccess = Array.from(document.querySelectorAll('.tweet')).every(t =>
            t.getAttribute('success') === 'true'
        )
        if (allSuccess) {
            window.dispatchEvent(eventReadComplete);
        }
    }
    return (
        <div className='tweet' success={success.toString()}>
            <TweetEmbed
                onTweetLoadSuccess={onSuccess}
                id={props.id}
                options={{
                    lang: 'ja'
                }}
            />
        </div>
    );
}

export { Rendering, useTweet, useCount };