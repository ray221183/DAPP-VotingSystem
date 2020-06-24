import React from 'react'

import TopBanner from '../topbanner/topbanner';
import Display from './display';
import './viewpage.css';

function ViewPage(props){
    return(
        <div>
            <TopBanner 
                data={props.data}
                handleChangePage={props.handleChangePage}
                handleUserImfo={props.handleUserImfo}
                read_topic={props.read_topic}
            />
            <Display
                data={props.data}
                handleChangePage={props.handleChangePage}
                handleCurrentItem={props.handleCurrentItem}
                SetItem={props.SetItem}
                DelItem={props.DelItem}
            />
        </div>
    );
}

export default ViewPage