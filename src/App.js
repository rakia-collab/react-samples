import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';


class App extends Component {
  state = {
    persons: [
      { id : 1,name: 'Max', age: 28 },
      { id : 2,name: 'Manu', age: 29 },
      { id : 3,name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons : false
  };
  
 
  

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

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }

  render() {
  let persons = null;
  if(this.state.showPersons){
    persons = (
      <div>
        {this.state.persons.map((e,index) => {
          return <Person 
          name={e.name} 
          age={e.age} 
          click={() => this.deletePersonHandler(index)} 
          key={e.id} 
          changed={(event) => this.nameChangeHandler(event,e.id)} />
        })}
      </div>
    );
    /*style.backgroundColor ='red';
    style[':hover'] = {
      backgroundColor:'salmon',
      color:'black'
    }*/
  }

    const classes =[];
    if(this.state.persons.length <= 2){
      classes.push('red'); //classes =['red']
    } 
    
    if(this.state.persons.length <= 1){
      classes.push('bold'); //classes=['red','bold']
    }
        
    
           

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button className="button"  onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
