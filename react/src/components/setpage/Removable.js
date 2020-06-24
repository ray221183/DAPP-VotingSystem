import React from 'react';

class Removable extends React.Component {
  constructor(props) {
    super(props);
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  onClickRemove() {
    var index = parseInt(this.props.index, 10);
    this.props.removeItem(index);
  }

  render () {
    return(
      <li className="list-group-item ">
        <div>
          {this.props.item}
          <button type="button" className="close" onClick={this.onClickRemove}>Remove</button>
        </div>
      </li>     
    );
  }
}

export default Removable;