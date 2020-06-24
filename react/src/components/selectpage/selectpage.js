import React from 'react'

import TopBanner from '../topbanner/topbanner';
import DisplaySelect from './displayselect';
import './select.css';

function SelectPage(props){
    return(
        <div>
            <TopBanner 
                data={props.data}
                handleChangePage={props.handleChangePage}
                handleUserImfo={props.handleUserImfo}
                read_topic={props.read_topic}
            />
            <DisplaySelect
                data={props.data}
                handleChangePage={props.handleChangePage}
                handleCurrentItem={props.handleCurrentItem}
                handleSelect = {props.handleSelect}
            />
        </div>
    );
}

export default SelectPage