import React from 'react';

const validationComponent = (props)=>{

let messageValidation = 'Text long enough';
if(props.lenght <= 5) {
    messageValidation = 'Text too short'
}
return (
    <div>
        <p>{props.lenght}</p>
        <p>{messageValidation}</p>
    </div>)
};


export default validationComponent;