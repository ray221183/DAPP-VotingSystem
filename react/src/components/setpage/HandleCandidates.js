import React from 'react';
import Removable from './Removable.js';

//var candidates = [];

class HandleCandidates extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            currentcandidate: null,
            candidates: this.props.data.candidates,
        }

        this.handleChange = this.handleChange.bind(this)
        this.addCandidate = this.addCandidate.bind(this)
        this.removeCandidate = this.removeCandidate.bind(this)
    }//end of constructor

    handleChange = (event) => {
        console.log('candidate name input')
        const {name, value} = event.target
        this.setState( { [name]: value } )
    }

    addCandidate = async () =>{
        let candidates = this.state.candidates;
        await this.props.data.contract.methods.SetCandidate(
            this.props.data.current_topicId,
            this.props.data.current_item,
            this.state.currentcandidate
        ).send(
            {from: this.props.data.accounts, 
            gas:1000000},
            (error) => {
                if (error){
                    console.log('failed to add candidate')
                }
            }
        )

        candidates.unshift(this.state.currentcandidate);
        this.setState({candidates: candidates})
        console.log('candidate added: ' + this.state.currentcandidate)
    }

    removeCandidate = async (candidateIndex) =>{
        let candidates = this.state.candidates;
        const delCan = candidates[candidateIndex]
        await this.props.data.contract.methods.DelCandidate(
            this.props.data.current_topicId,
            this.props.data.current_item,
            delCan
        ).send(
            {from: this.props.data.accounts, 
            gas:1000000},
            (error) => {
                if (error){
                    console.log('failed to remove candidate')
                }
            }
        )
        candidates.splice(candidateIndex, 1)
        this.setState({candidates: candidates})
        console.log('candidate removed: ' + delCan)
    }

    render(){
        var added = this.state.candidates.map((candidate, index) => {
            return (
                <Removable key={candidate + index} item={candidate} index={index} removeItem={this.removeCandidate}/>
            )
        });
        return(
            <div id = "candidateUI">
                <label id="candidatename-label">
                    Candidate:
                    <input 
                        id="candidatename"
                        type="text" 
                        name="currentcandidate" 
                        value={this.state.currentcandidate}
                        placeholder="Candidate Name" 
                        onChange={this.handleChange}
                    />
                </label>
                <button 
                    id = "addcandidate"
                    onClick = {() => this.addCandidate()}
                >
                    Add Candidate
                </button>

                <ul className="list-group"> {added} </ul>

            </div>
        )
    }
}

export default HandleCandidates