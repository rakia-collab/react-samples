import React,{PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
  constructor(props){
    super();
  }

  /*static getDerivedStateFromProps(props,state){
    console.log('[Persons.js] getDerivedStateFromProps',props);
    return state;
  }*/

  /*componentWillReceiveProps(props){
    console.log('[Persons.js] componentWillReceiveProps',props);
  }*/

  /* shouldComponentUpdate(nextProps,nextState){
    console.log('[Persons.js] shouldComponentUpdate');
    if(nextProps.persons !== this.props.persons || 
       nextProps.changed !== this.props.changed || 
       nextProps.clicked !== this.props.clicked)
      return true;
    else{
      return false; 
    } 
  } */

  getSnapshotBeforeUpdate(prevProps,prevState){
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return {message:'Snapshot!'};
  }
  
  componentDidUpdate(prevProps,prevState,snapshot){
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  componentWillUnmount(){
    console.log('[Persons.js componentWillUnmount]');
  }

  render(){
    console.log('[Persons.js] rendering');
    return this.props.persons.map((e,index) => {
      return<Person 
      key={index}
      name={e.name} 
      age={e.age} 
      click={() => this.props.clicked(index)}  
      changed={(event) => this.props.changed(event,e.id)} 
      isAuth={this.props.isAuthentificated}/>
    });
  }
}

 export default Persons;     