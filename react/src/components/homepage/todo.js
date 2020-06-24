import React from 'react'
import NewTopic from './newtopic'



class Todo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            newtopic: false,
        }
        this.handleNewTopic = this.handleNewTopic.bind(this)
    }
    handleNewTopic = (addTopic) => {
        this.setState( { newtopic: addTopic } )
    }
    render(){
        return(
            <div id="todo">
                <div id="new-poll" 
                    onClick={
                        () => {
                            if(!this.state.newtopic){
                                this.handleNewTopic(true)
                            }
                        }
                    }
                >   
                    New Poll
                    <NewTopic 
                        data={this.props.data}
                        newtopic = {this.state.newtopic}
                        handleNewTopic = {this.handleNewTopic}
                        handleTopic={this.props.handleTopic}
                        handleChangePage={this.props.handleChangePage}
                        read_topic={this.props.read_topic}
                    />
                </div>
                <div id="tovote"
                    onClick={
                        () => {
                            this.props.get_available_launched()
                        }
                    }
                >
                    Vote
                </div>
            </div>
        );
    }
}

export default Todo