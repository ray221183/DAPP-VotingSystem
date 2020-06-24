import React from 'react';
import Removable from './Removable.js'

//var voters = [];

class HandleVoters extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            currentvoter: null,
            voters: this.props.data.voters,
        }

        this.handleChange = this.handleChange.bind(this)
        this.addVoter = this.addVoter.bind(this)
        this.removeVoter = this.removeVoter.bind(this)
    }//end of constructor

    addVoter = async () =>{
        let voters = this.state.voters;
        await this.props.data.contract.methods.SetVoter(
            this.props.data.current_topicId,
            this.props.data.current_item,
            this.state.currentvoter
        ).send(
            {from: this.props.data.accounts, 
            gas:1000000},
            (error) => {
                if (error){
                    console.log('failed to add candidate send')
                }
            }
        )
        voters.unshift(this.state.currentvoter);
        this.setState({voters: voters})
        console.log('voter added: ' + this.state.currentvoter)
    }

    removeVoter = async (voterIndex) =>{
        let voters = this.state.voters;
        const delVoter = voters[voterIndex]
        await this.props.data.contract.methods.DelVoter(
            this.props.data.current_topicId,
            this.props.data.current_item,
            delVoter
        ).send(
            {from: this.props.data.accounts, 
            gas:1000000},
            (error) => {
                if (error){
                    console.log('failed to remove voter')
                }
            }
        )
        voters.splice(voterIndex, 1)
        this.setState({voters: voters})
        console.log('voter removed: ' + delVoter)
    }

    handleChange = (event) => {
        console.log('voter id input')
        const {name, value} = event.target
        this.setState( { [name]: value } )
    }

    render(){
        var added = this.state.voters.map((voter, index) => {
            return (
                <Removable key={voter + index} item={voter} index={index} removeItem={this.removeVoter}/>
            )
        });
        return(
            <div id = "voterUI">
                <label id="voterid-label">
                    Voter ID:
                    <input 
                        id="voterid"
                        type="text" 
                        name="currentvoter" 
                        value={this.state.currentvoter}
                        placeholder="Voter ID" 
                        onChange={this.handleChange}
                    />
                </label>
                <button 
                    id = "addvoter"
                    onClick = {() => this.addVoter()}
                >
                    Add Voter
                </button>
                <ul className="list-group"> {added} </ul>
            </div>
        )
    }
}

export default HandleVoters