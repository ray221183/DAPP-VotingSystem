import React from 'react'


class Display extends React.Component{
    constructor(props){
        super(props)
        this.state={
            item: "",
        }
        this.handleitem  = this.handleitem.bind(this)
    }
    handleDeleteTopic = async() => {
        if(parseInt(this.props.data.current_status) === 0){
            const { accounts, contract, current_topicId } = this.props.data;
            await contract.methods.delete_vote(
                current_topicId
            ).send({
                from: accounts, 
                gas:1000000},
                (error) => {
                    if (error){
                        console.log('delete_vote error')
                    }
                })
            this.props.handleChangePage('HomePage')
        }
        else{
            alert('you can only delete an unstarted topic')
        }
    }
    handleStatus = (status) => {
        this.props.status_control(status)
    }
    handleitem = (event) => {
        const {name, value} = event.target
        this.setState( { [name]: value } )
    }
    handleResult = (element) => {
        this.props.handleCurrentItem(element, 2)
    }
    handleEdit = (element) => {
        this.props.handleCurrentItem(element, 0)
    }
    showstatus = () => {
        if(parseInt(this.props.data.current_status) === 0){
            return(
                <div id="status-0"></div>
            );
        }
        else if(parseInt(this.props.data.current_status) === 1){
            return(
                <div id="status-1"></div>
            );
        }
        return(
            <div id="status-2"></div>
        );
    }
    showResult = (props) => {
        console.log('element', props.element)
        if (parseInt(this.props.data.current_status) === 2){
            return(
                <button id="view-result" 
                        onClick={ () => this.handleResult(props.element.toString()) }> result </button>
            );
        }
        return(
            <p></p>
        );
    }
    showitems = () => {
        const itemsArray = this.props.data.items.map((element, index) =>
            <div key={index}>
                Item name{" "}:{" "}{element}
                <this.showResult element={element} />
                <button id="edit" 
                        onClick={ () => this.handleEdit(element)}> edit </button>
                <button id="delete" onClick={ () => {this.props.DelItem(element)} } > delete </button>
            </div>
        )
        return(
            <ul>
                {itemsArray}
            </ul>
        );
    }
    render(){
        return(
            <div id="view">
                <div id="topic-control">
                    Topic Name{" "}:{" "}{this.props.data.current_topic}
                    <input id="item"
                           name="item" 
                           value={this.state.item} 
                           placeholder="new vote" 
                           onChange={this.handleitem}
                    />
                    <button id="add-item" onClick={() => {this.props.SetItem(this.state.item)}}>add item</button>
                    <button id="start" onClick={ () => this.handleStatus(1) }>start</button>
                    <button id="end" onClick={ () => this.handleStatus(2) }>end</button>
                    <this.showstatus />
                    <button id="delete-topic" onClick={ () => this.handleDeleteTopic() }>delete topic</button>
                </div>
                <hr id="cut-line"/>
                <div id="items">
                    <this.showitems />
                </div>
            </div>
        );
    }
}

export default Display