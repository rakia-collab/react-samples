import React,{Component} from 'react';
import './Person.css';


class Person extends Component {

    constructor(props){
        super();
    }

    render(){
        console.log('[Person.js] rendering');
        return (
            <div className="Person">
            <p onClick={this.props.click}>I'm a {this.props.name} and i am {this.props.age} years old</p>
            <p>{this.props.children}</p>
            <input type="text" onChange={this.props.changed} value={this.props.name}/>
            </div>
        )
    }
  
};

export default Person;