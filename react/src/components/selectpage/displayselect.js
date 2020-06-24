import React from 'react'


class DisplaySelect extends React.Component{
    constructor(props){
        super(props)
        this.state={
            topicIdx: -1,
            imported: 0,
        }
        this.handelChange = this.handelChange.bind(this)
        this.show = this.show.bind(this)
    }
    handelChange = (e) => {
        this.setState( { topicIdx: e.target.value }, function(){console.log('setState complete')} )
    }
    show = () => {
        console.log('click2')
        console.log(this.state.topicIdx)
        this.setState( {imported: 1} )
        this.props.handleSelect(parseInt(this.state.topicIdx))
    }
    handleResult = (element) => {
        this.props.handleCurrentItem(element, 2)
    }
    handleVote = (element) => {
        this.props.handleCurrentItem(element, 1)
    }
    showstatus = () => {
        if(this.state.topicIdx === -1 || parseInt(this.state.imported) === 0){
            return(
                <div></div>
            );
        }
        else if(parseInt(this.props.data.current_status) === 0){
            return(
                <div id="status-select-0"></div>
            );
        }
        else if(parseInt(this.props.data.current_status) === 1){
            return(
                <div id="status-select-1"></div>
            );
        }
        return(
            <div id="status-select-2"></div>
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
    showTopics = () => {
        const topicsArray = this.props.data.topics.map((element, index) =>
            <option value={index} key={index}>{element}</option>
        )
        return(
            <select value={this.state.topic} onChange={this.handelChange}>
                <option value={-1}> ---- </option>
                {topicsArray}
            </select>
        );
    }
    showitems = () => {
        const itemsArray = this.props.data.items.map((element, index) =>
            <div key={index}>
                Item name{" "}:{" "}{element}
                <this.showResult element={element} />
                <button id="go-vote" 
                        onClick={ () => this.handleVote(element)}> Go Vote </button>
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
                    Topic Name{" "}:{" "}
                    <this.showTopics />
                    <button onClick = { () => this.show() }>import</button>
                    <this.showstatus />
                </div>
                <hr id="cut-line"/>
                <div id="items">
                    <this.showitems />
                </div>
            </div>
        );
    }
}

export default DisplaySelect