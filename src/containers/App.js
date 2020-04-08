import React, { Component } from 'react';
import  './App.css';
import  Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';


class App extends Component {

  constructor(props){
    super();
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id : 1,name: 'Max', age: 28 },
      { id : 2,name: 'Manu', age: 29 },
      { id : 3,name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons : false,
    showCockpit : true
  };
  
  static getDerivedStateFromProps(props,state){
    console.log('[App.js] getDerivedStateFromProps',props);
    return state;
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }

  nameChangeHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p=>{
      return p.id === id;
    });
    const person = {...this.state.persons[personIndex]};

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({
      persons: persons
    }); 
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons : !doesShow});
  }

  showCockpit = () => {
    this.setState({showCockpit : false});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }

  render() {
  console.log('[App.js] render');
  let persons = null;
  if(this.state.showPersons){
    persons = (
        <Persons 
        persons={this.state.persons}
        clicked={this.deletePersonHandler} 
        changed={this.nameChangeHandler}/>
    );
  }

  let CockpitComp = null;
  if(this.state.showCockpit){
    CockpitComp = (
      <Cockpit toggled={this.togglePersonsHandler}  title={this.props.appTitle}/>
    );
  }
     

    return (
      <div className="App">
        <button onClick={this.showCockpit}>remove cockpit</button>
        {CockpitComp}
        {persons}
      </div>
    );
  }
}

export default App;
