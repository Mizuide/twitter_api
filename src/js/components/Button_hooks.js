import React, { useState,useContext,useRef} from "react";
import axios from "axios";
import { Rendering, useCount, useTweet } from "./RenderingTweet";
import {ReadCompleteContext} from "./Layout";



const Button = (props) => {
    const [end, setEnd] = useCount(10);
    const [tweetList, setTweetList] = useState([]);
    const readCompleteFlg = useContext(ReadCompleteContext);
    const intervalRef = useRef();
    intervalRef.current=readCompleteFlg;    

    const push = (p) => {
        console.log(p);
        axios.create().post(DOMAIN, p).then(res => res.data).then(res => {
            setTweetList(res);

            setEnd();
            let observer = new IntersectionObserver(() => {
                //countを再設定し、表示範囲を広げる
                console.log(intervalRef);
                if (intervalRef) {
                    setEnd();
                }
            }
                , {
                    root: null,
                    rootMargin: "10%",
                    threshold: 1.0
                }
            );
            let target = document.querySelector('#footer');
            observer.observe(target);
        });
    };


    return (
        <div>
            <input type="button" value="実行！" onClick={() => push(props)} />
            <Rendering count={end} tweetList={tweetList} />
            <div id="footer" />
        </div>
    )
};

export default Button;