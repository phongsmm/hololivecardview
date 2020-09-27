import React  from 'react';
import axios from'axios'
import './App.css';
import 'semantic-ui-css/semantic.min.css'


class Menu extends React.Component {

    

constructor(props){
  super(props);
  this.state = {
      holostate:[],
      date:new Date(),
      stringdate :"",
      countdata:0
  }
  this.count = this.count.bind(this)

}

componentDidMount(){

axios.get('https://holo.dev/api/v1/lives/scheduled').then(res=>{
  const data = res.data;
  this.setState({holostate:data.lives});

})


    this.setState({stringdate:`${this.state.date.toISOString().substring(0,10)}`});

  


}

shouldComponentUpdate(props,state){
  if(this.state!==state){
    return true;
  }return false;

}

count(){

  
    var countdata =[];
    this.state.holostate.map((hololive,i)=>{
        if(hololive.start_at.split("T")[0] === this.state.stringdate)  {return countdata.push(hololive)}  
         return 0;
    });

    return countdata.length;

}





  render(){

    this.count();
    console.log();

  return (
    <div>
        <div>
            <div className="ui secondary menu" style={{backgroundColor:"#f1f3f8"}}> 
        <div>

        <button className="ui red button" style={{marginTop:"5px",marginBottom:"5px",marginLeft:"8px"}}>
  <i className={"ui play icon "} style={{color:"#fcdab7"}}></i> Today Lives <div className="ui label"> {this.count()}
</div> </button>
  
   
  <a style={{position:"absolute",left:"2px",top:"50px"}} href="https://holo.dev/api/v1/lives/scheduled" className="ui blue image label">fecth<div className="detail">https://holo.dev/api/v1/lives/scheduled</div></a>
 
        
          </div>  </div> </div>


      </div>

  );
  }

}


export default Menu;
