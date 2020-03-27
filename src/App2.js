import React, { Component } from 'react';
import './App.css';
import CharComponent from './CharComponent/CharComponent';
import ValidationComponent from './ValidationComponent/ValidationComponent';

class App extends Component {

    state = {
        inputValue:'',
        lenght : 0,
    };

    intputLenghtChangeHandler = (event) => {
        const chaine = event.target.value;
        const long = chaine.length;
       
        this.setState({
            lenght: long,
            inputValue : event.target.value
        });
      };
      deleteLetterHandler = (index) =>{
       const arrayList = Array.from(this.state.inputValue);
      
       arrayList.splice(index,1);
       const letters = arrayList.join('');
       this.setState({
        lenght: letters.length,
        inputValue : letters
        });
      }

    render() {
        let letters = null;
        const arrayLetters = Array.from(this.state.inputValue);
        letters = (
           <div>{
                arrayLetters.map((l,index)=>{
                return <CharComponent letter={l} click={() => this.deleteLetterHandler(index)} key={index}></CharComponent>    
               })} 
            </div>  
        )

        const longeur = this.state.lenght;
         var status ;
          if(longeur >= 5)
          status = 'Text long enough'
          else
          status = 'Text too short'


    return (
        <div>
        <input 
        type="text" 
        onChange={(event) => this.intputLenghtChangeHandler(event)} 
        value={this.state.inputValue}/>
        <p>{this.state.inputValue}</p>
        <ValidationComponent lenght={this.state.lenght} lenghtStatus={status}></ValidationComponent>
        {letters}
        </div>
        )
    }
}

export default App;