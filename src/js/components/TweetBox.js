import React from "react";
import TweetEmbed from 'react-tweet-embed';

export default class TweetBox extends React.Component {

    constructor() {
        super();
        const resultZone = document.querySelector('.resultZone');
        resultZone.classList.add('indicator');
        this.state = { success: 'false' };
    }

    onSuccess() {
        this.setState({ success: 'true' });

        const eventReadComplete = new CustomEvent('readComplete', {
            bubbles: true,
        });

        let allSuccess = Array.from(document.querySelectorAll('.tweet')).every(t =>
            t.getAttribute('success') === 'true'
        )
        if (allSuccess) {
            window.dispatchEvent(eventReadComplete)
        }
    }

    render() {
        return (
            <div className='tweet' success={this.state.success}>
                <TweetEmbed
                    onTweetLoadSuccess={this.onSuccess.bind(this)}
                    id={this.props.id}
                    options={{
                        lang: 'ja'
                    }}
                />
            </div>
        );
    }
}