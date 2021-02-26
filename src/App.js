import React  from 'react';
import _ from 'lodash'
import Menu from './Menu';
import 'semantic-ui-css/semantic.min.css';
import ReactDOM from "react-dom";
import './App.css';
import GirdLayout from './Layout'





class App extends React.Component {

  

  _isMounted = false;
  

constructor(){
  super();
  this.state = {
    layout: [] 
  }
  this.onLayoutChange = this.onLayoutChange.bind(this);

}

onLayoutChange(layout) {
  this.setState({ layout: layout });
}

 async componentDidMount(){

  this.setState({ mounted: true });

  
}

componentWillUnmount(){

  this._isMounted = false;

}





  render(){
    

  return (

    
    
    
    <div className="App" style={{flex:1 , backgroundColor:'transparent'}}>

      
      <Menu/> 



<div>
        <GirdLayout onLayoutChange={this.onLayoutChange} />
      </div>



      </div>



    
  );
}
}


const contentDiv = document.getElementById("root");
const gridProps = window.gridProps || {};
ReactDOM.render(React.createElement(GirdLayout, gridProps), contentDiv);




export default App;
