import React from 'react'

import TopBanner from '../topbanner/topbanner';
import HandleCandidates from './HandleCandidates.js';
import HandleVoters from './HandleVoters.js';

function SetPage(props){
    return(
        <div>
            <TopBanner 
                data={props.data}
                handleChangePage={props.handleChangePage}
                read_topic={props.read_topic}
            />
            <h2 id = "itemname">
                {props.data.current_item}
            </h2>

            <HandleCandidates
                data={props.data}
                handleChangePage={props.handleChangePage}
            />

            <HandleVoters
                data={props.data}
                handleChangePage={props.handleChangePage}
            />

        </div>
    );
}

export default SetPage