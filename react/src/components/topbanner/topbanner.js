import React from 'react'
import Sign from './sign.js'


function TopBanner(props) {
    return(
        <div id="topbanner">
            <div id="logotitle"></div>
            <div className="backToHompage" onClick={() => props.handleChangePage("HomePage")}>
                <img src={require('./vote.png')} alt="homepage"/>
            </div>
            <div id = "current_address">
                current account: {props.data.accounts}
            </div>
            <Sign 
                data={props.data}
                handleChangePage={props.handleChangePage}
                read_topic={props.read_topic}
            />
        </div>
    );
}

export default TopBanner