import React, { useState } from "react";

const sample = (count) => {
    const [tweetList, setTweetList] = useState([]);
    const [displayList, setDisplayList] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);


    const test = () => {
        setEnd(end + count);
        tweetList.push(end);
        setDisplayList(tweetList.map((d) => <div>{d}</div>));
    }

    return [displayList, test]
}



const Testing = () => {
    const [displayList, test] = sample(10);
    
    return (
        <div>
            <div>
                {displayList}
            </div>
            <input type="button" value="hogehoge" onClick={push()} />
        </div>
    );
}

const PropTest = (props) => {
    return (
        <div>
            {props.hoge}
        </div>
    );
};

const useHooksSample = () => {
    const [hoge, setHoge] = useState('hoge');

    return [hoge, setHoge]
};

const propsTest = () => {
    const [hoge, setHoge] = useHooksSample();

    return (
        <div>
            <PropTest hoge={hoge} />
            <input type="button" value="実行！" onClick={() => {setHoge('huga')
        console.log(hoge);
        }} />
        </div>
    );
}

export { useHooksSample };
export default propsTest;