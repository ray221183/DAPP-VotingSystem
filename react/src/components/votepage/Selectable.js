import React from 'react';

class Selectable extends React.Component {
  constructor(props) {
    /*this.state = {
      current_result = ""
    }*/
    super(props);
    this.onClickSelect = this.onClickSelect.bind(this);
    //this.onClickViewResult = this.onClickViewResult.bind(this);
  }

  onClickSelect() {
    this.props.setCSC(this.props.item)
  }

  /*onClickViewResult = async () =>{
    const result = await this.props.data.contract.methods.view_result(this.props.data.current_topicId, this.props.data.current_item, this.props.item).call()

  }*/

  render () {
    const index = parseInt(this.props.index, 10);
    if (this.props.data.current_status === "1"){
      return(
        <li className="list-group-item ">
          <div>
            {this.props.item}
            <button type="button" className="close" onClick={this.onClickSelect}>Select</button>
          </div>
        </li>     
      );
    }
    else if (this.props.data.current_status === "2"){
      return(
        <li className="list-group-item ">
          <div>
            {this.props.item}.result: {this.props.data.num_ballot[index]}
          </div>
        </li>
      );
    }
    else{
      return(
        <li className="list-group-item ">
          <div>
            {this.props.item}
          </div>
        </li>
      );
    }
  }
}

export default Selectable;