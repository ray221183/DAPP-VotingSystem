import React from 'react'


import TopBanner from '../topbanner/topbanner';
import MainPic from './mainpic'
import Todo from './todo'

function HomePage(props){
    return(
        <div>
            <TopBanner 
                data={props.data}
                handleChangePage={props.handleChangePage}
                //handleUserImfo={props.handleUserImfo}
                read_topic={props.read_topic}
            />
            <MainPic />
            <Todo 
                data={props.data}
                handleChangePage={props.handleChangePage}
                handleTopic={props.handleTopic}
                read_topic={props.read_topic}
                get_available_launched = {props.get_available_launched}
            />
        </div>
    );
}

export default HomePage