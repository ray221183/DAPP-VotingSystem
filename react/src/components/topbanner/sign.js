import React from 'react'
//import './startpage.css'

function Sign(props) {
    if(props.data.current_page === "StartPage" || props.data.current_page === "NewAccountPage"){
        return(
            <div></div>
        );
    }
    return(
        <div className="sign">
            <div id="view-poll" onClick={() => {
                props.read_topic()
                props.handleChangePage("ViewPage")
                }
            }
                >
                    View
            </div>
        </div>
        );
}

export default Sign