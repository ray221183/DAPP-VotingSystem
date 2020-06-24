import React from 'react'

import TopBanner from '../topbanner/topbanner';
import Display from './display';

function ViewPage(props){
    return(
        <div>
            <TopBanner 
                data={props.data}
                handleChangePage={props.handleChangePage}
                read_topic={props.read_topic}
            />
            <Display
                data={props.data}
                handleChangePage={props.handleChangePage}
                handleCurrentItem={props.handleCurrentItem}
                SetItem={props.SetItem}
                DelItem={props.DelItem}
                status_control = {props.status_control}
            />
        </div>
    );
}

export default ViewPage