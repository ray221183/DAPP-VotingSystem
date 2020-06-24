import React from 'react'

import TopBanner from '../topbanner/topbanner';
import Selectable from './Selectable.js';

class VotePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //candidates: this.props.candidates,
            candidates: this.props.data.candidates,
            currentselectedcandidate: null,
        }

        this.setCSC = this.setCSC.bind(this);
        this.sendCSC = this.sendCSC.bind(this);
    }

    setCSC(candidate){
        this.setState({currentselectedcandidate: candidate})
        console.log("candidate selected: " + candidate)
    }

    sendCSC = async() =>{
        await this.props.data.contract.methods.send_ballot(
            this.props.data.current_topicId, 
            this.props.data.accounts, 
            this.props.data.current_item, 
            this.state.currentselectedcandidate).send(
                {from: this.props.data.accounts, 
                gas:1000000},
                (error) => {
                    if (error){
                        console.log('failed to send vote')
                    }
                }
            )
        console.log("vote sent")
        this.props.handleChangePage("HomePage")
    }

    render(){
        var added = this.state.candidates.map((candidate, index) => {
            return (
                <Selectable key={candidate + index} item={candidate} index={index} setCSC={this.setCSC} data = {this.props.data}/>
            )
        });
        if (this.props.data.current_status === "1"){
            return(
                <div>
                    <TopBanner 
                    data={this.props.data}
                    handleChangePage={this.props.handleChangePage}
                    read_topic={this.props.read_topic}
                    />

                    <h2 id = "vptitle">
                        Candidates for: {this.props.data.current_item}
                    </h2>

                    <div id = "listcand">
                        <ul className="list-group"> {added} </ul>
                    </div>

                    <h3 id = "selectedmessage">
                        Current selected candidate: {this.state.currentselectedcandidate}
                    </h3>

                    <button id = "sendvote" onClick = {this.sendCSC}>
                        send
                    </button>
                </div>
            );
        }
        else{
            return(
                <div>
                    <TopBanner 
                    data={this.props.data}
                    handleChangePage={this.props.handleChangePage}
                    read_topic={this.props.read_topic}
                    />
    
                    <h2 id = "vptitle">
                        Candidates for: {this.props.data.current_item}
                    </h2>
    
                    <div id = "listcand">
                        <ul className="list-group"> {added} </ul>
                    </div>
                </div>
            );
        }
    }
}

export default VotePage