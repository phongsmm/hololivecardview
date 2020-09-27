import React  from 'react';
import './App.css';
import axios from'axios'
import Holoplay from './Holoplay';
import Tabs from './Tabs';
import Menu from './Menu';

import 'semantic-ui-css/semantic.min.css'


class App extends React.Component {

  _isMounted = false;

constructor(){
  super();
  this.state = {
    dateString: "",
    hololive:[],

  }

  this.c_Tabshanddle = this.c_Tabshanddle.bind(this);
}

 componentDidMount(){

   axios.get('https://holo.dev/api/v1/lives/scheduled').then(res=>{

    const data =  res.data;
    this.setState({hololive:data.lives});

   })
  

axios.get('https://holo.dev/api/v1/lives/current').then(res=>{

    const data =  res.data;
    const currentlive =  data.lives;
  this.setState(prevState=>({hololive:[...prevState.hololive,...currentlive]}))


})





}



componentWillUnmount(){

  this._isMounted = false;

}

shouldComponentUpdate(props,state){
  if(this.state !== state){
    return true;
  }return false;

}


c_Tabshanddle(e){
  this.setState({dateString:e});

}





  render(){

  return (
    <div className="App">
      <Menu/> 
      <header className="App-header">

      <Tabs sendDate={this.c_Tabshanddle}/>
      <h1> This Day : {this.state.dateString}</h1>
      </header>
      

      {this.state.hololive.map((hololive,i)=>{
       
         if(hololive.start_at.split("T")[0] === this.state.dateString)   {

    
          return <Holoplay key={"player/"+i} url={hololive.room} id={i} spacing={i*10}/>
         } return "";
            
         
      })}

      </div>

  );
}
}


export default App;
