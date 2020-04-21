import React,{Component} from 'react';
import './Person.css';
import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/aut-context';

class Person extends Component {

    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount (){
       // this.inputElement.focus();
       this.inputElementRef.current.focus();
    }

    render(){
        console.log('[Person.js] rendering');
        return (
            <Auxiliary>
                <AuthContext.Consumer>
                    {(context) =>  context.authetificated ?   <p>Authentificated !</p> : <p>Please log in</p> }
                </AuthContext.Consumer>
           
            <p onClick={this.props.click}>I'm a {this.props.name} and i am {this.props.age} years old</p>
            <p>{this.props.children}</p>
            <input 
            type="text" 
            ref = {this.inputElementRef}
           // ref={(inputEl) => {this.inputElement = inputEl}}
            onChange={this.props.changed} 
            value={this.props.name}/>
            </Auxiliary>
        )
    }
  
};

Person.propTypes ={
    click : PropTypes.func,
    name : PropTypes.string,
    age : PropTypes.number,
    changed : PropTypes.func
    };

export default withClass(Person,"Person");