import React from 'react'



class NewTopic extends React.Component{
    constructor(props){
        super(props)
        this.state={
            topicname: ""
        }
        this.handleTopic = this.handleTopic.bind(this)
    }

    launch_vote = async() => {
        const { accounts, contract } = this.props.data;
        const userId = accounts;
        await contract.methods.launch_vote(
            userId,
            this.state.topicname
        ).send({
                from: accounts, 
                gas:1000000},
                (error) => {
                    if (error){
                        console.log('launch_vote error')
                        alert('please delete the topic you\'ve launched before')
                    }
                })
        await this.props.read_topic()
        this.props.handleChangePage("ViewPage")
    }

    handleTopic = (e) => {
        const {name, value} = e.target
        this.setState( { [name]: value } )
    }
    render(){
        if(!this.props.newtopic){
            return(
                <div></div>
            );
        }
        return(
            <div id="topic">
                <label id="topic">
                    New Topic{" "}:{" "}
                    <input 
                        type="text"
                        name="topicname"
                        value={this.state.topicname}
                        onChange={this.handleTopic}>
                    </input>
                    {" "}
                    <button 
                        id="add-topic" 
                        onClick={() => {
                            this.launch_vote()
                        }}>
                        add
                    </button>
                    {" "}
                    <button 
                        id="cancel-topic" 
                        onClick={() => this.props.handleNewTopic(false)}>
                        cancel
                    </button>
                </label>
            </div>
        );
    }
}

export default NewTopic