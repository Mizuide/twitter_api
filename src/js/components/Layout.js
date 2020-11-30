import React from "react";
import Example from "../OfficialTest"
import Inputzone from "./InputZone_hooks";

let ReadCompleteContext = React.createContext(true);

export default class Layout extends React.Component {

    
        constructor() {
            super();
            this.state={complete: false}
        };
        componentDidMount() {
            window.addEventListener('readStart', () =>
            this.setState({ complete: false })
            )
            
            window.addEventListener('readComplete', () =>{
            console.log('readed');
            this.setState({ complete: true })
            });
        }
 
    render() {

        return (
            <ReadCompleteContext.Provider value={this.state.complete}>
            <div>
            {this.state.complete.toString()}
                <h1>ツイートを人気順にソート</h1>                
                <Inputzone />
            </div>
            </ReadCompleteContext.Provider>
            );
    }
}


export {ReadCompleteContext} 