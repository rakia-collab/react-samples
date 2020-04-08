import React,{useEffect} from 'react';
import  './Cockpit.css';

const Cockpit = (props) => {

    useEffect(() => {
        console.log('[cockpit.js] useEffect');
        setTimeout(() => {
            alert('save somed data to cloud !');
        }, 1000);
        return ()=>{
            console.log('[cockpit.js] cleanup work in useEffect');
        }
    },[]);

    useEffect(() => {
        console.log('[cockpit.js] 2nd useEffect');
        return ()=>{
            console.log('[cockpit.js] cleanup work in 2nd useEffect');
        }
    });

    return (
    <div className="App"> 
        <h1>{props.title}</h1>
        <p>This is really working!</p>
        <button className="Button"  onClick={props.toggled}>Toggle Persons</button>
    </div>
    )
};

export default React.memo(Cockpit);