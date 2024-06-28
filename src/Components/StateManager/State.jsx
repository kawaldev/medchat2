import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
class State {
    constructor(controller) {
        this.controller = controller;
    }

    onEnter() {}
    onExit() {}

    handleEvent(event, payload) {
        console.log("Unhandled event:", event);
    }
}
export default State
 