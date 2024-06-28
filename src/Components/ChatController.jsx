class ChatController {
    constructor(view, initialStateClass) {
        this.view = view;
        this.transitionTo(new initialStateClass(this));
        console.log("Chat contoller");
    }

    transitionTo(newState) {
        if (this.currentState) {
            this.currentState.onExit();
        }
        this.currentState = newState;
        this.currentState.onEnter();
    }

    setHeader(header) {
        this.view.setHeader(header);
    }

    setBubbleMessage(message) {
        this.view.setBubbleMessage(message);
    }

    setQAContent(questions) {
        this.view.setQAContent(questions);
    }

    handleEvent(event, payload) {
        this.currentState.handleEvent(event, payload);
    }
}
export default ChatController;