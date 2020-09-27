import React  from 'react';
import './App.css';


class Tabs extends React.Component {


constructor(){
  super();
  this.state = {
    date : new Date()

  }


}

componentDidMount(){

  const Time = setInterval(() => {
        this.setState({date:new Date()})
        this.props.sendDate(`${this.state.date.toISOString().substring(0,10)}`);
    },1000);

    return()=>clearInterval(Time);


}



  render(){
   
  return (
    <div >
        
        <h1> Times : <span> {this.state.date.toLocaleTimeString()} </span> </h1>

      </div>

  );
}
}


export default Tabs;
