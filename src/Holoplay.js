import React from 'react';
import './App.css';
import {Rnd} from "react-rnd";
import YouTube from 'react-youtube';





class Holoplay extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tabs :{ width: 300,
                height: 300,
                x: 200,
                y: -300} ,
         }

        this.onReady = this.onReady.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }


    componentDidMount(){


    }

    shouldComponentUpdate(props,state){
        if(this.state!==state){
            return true;
        }return false;
    }



    onReady(event){
  }
  onPlay(e){
      
  }


  tabclose(e){
      var id = e.target.parentNode.parentNode.getAttribute("id");
    var list = document.getElementById(id);
        list.parentNode.removeChild(list);
    
  }

  handleResize(e){
      this.setState({tabs:{width :e.target.size}});
      console.log(e.size);
  }


render(){
    
const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 2px #ddd",
    background: "white",
    borderRadius: "20px",
  };
  

    const opts = {
        height: this.state.tabs.height-30,
        width: this.state.tabs.width-30,
        playerVars: {
          autoplay: 0,
        },
      };

    return (

     <div>

    <div id="board">

            
  <div id={"tab"+this.props.id}>
     
<Rnd style={style}
    default={{width:this.state.tabs.width , height:this.state.tabs.height ,x:this.state.tabs.x+this.props.spacing,y:this.state.tabs.y-150}}

    onResize={(e, direction, ref, delta, position) => {
        
        this.setState({
          tabs:{width: ref.offsetWidth,
          height: ref.offsetHeight},
          ...position,
        });
      } }
        

  >
      

      <button className="ui red button" style={{top:"-10px",left:"-5px" , position:"absolute"}} onClick={this.tabclose}> Close</button>


<div> 
        <YouTube  videoId={this.props.url} opts={opts} onReady={this.onReady} onPlay={this.onPlay}/>

      </div>
    
    
  </Rnd>


</div>

           

  
  

 
  </div> 

        </div>

);

}
}

export default Holoplay;
