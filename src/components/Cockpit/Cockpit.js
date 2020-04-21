import React,{useEffect,useRef} from 'react';
import  './Cockpit.css';
import AuthContext from '../../context/aut-context';

const Cockpit = (props) => {

    const buttonToggle = useRef();


    useEffect(() => {
        console.log('[cockpit.js] useEffect');
        buttonToggle.current.click();
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
        <button ref={buttonToggle} className="Button"  onClick={props.toggled}>Toggle Persons</button>
        <AuthContext.Consumer>
         {(context) => <button className="Button"  onClick={context.login}>Log in</button>} 
        </AuthContext.Consumer>
        
    </div>
    )
};

export default React.memo(Cockpit);