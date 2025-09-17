import React, { Component } from "react";


class Task3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState({ time: new Date() })
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.time !== this.state.time) {
            console.log("Clock updated:", this.state.time.toLocaleTimeString());
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    render() {
        return (
            <div>
                <h1>🕒 Digital Clock</h1>
                <h2>{this.state.time.toLocaleTimeString()}</h2>
            </div>
        )
    }
}

export default Task3