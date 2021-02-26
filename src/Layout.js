import React from "react";
import PropTypes, { func } from "prop-types";
import axios from'axios'
import _, { functions } from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import ReactPlayer  from 'react-player/youtube';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class GirdLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBreakpoint: "lg",
      mounted: false,
      dateString: "",
      hololive: [],
      todaylive:[],
      date:new Date(),
      items: []

      }
    

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }


  

  async componentDidMount() {

    this.setState({ mounted: true });
    const res1 = await axios.get('https://holo.dev/api/v1/lives/scheduled')
    const res2 = await axios.get('https://holo.dev/api/v1/lives/current')
    await this.setState(()=>({hololive:[...res1.data.lives,...res2.data.lives]}))
    await this.setState({dateString:`${this.state.date.toISOString().substring(0,10)}`})
    const Log  = await this.state.hololive.filter(live=>
      live.start_at.split("T")[0] === this.state.dateString
    )
    await  console.log(this.state.hololive)


     this.setState({todaylive:Log})
     this.state.todaylive.map(((l,i)=>{
       this.setState({items:this.state.items.concat({
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          room: l.room,
          id:l.id
       })})
     }))



  
  }
  
  componentWillUnmount(){
  
    this._isMounted = false;
  
  }

  
shouldComponentUpdate(props,state){
  if(this.state !== state){
    return true;
  }return false;

}


/* { <div key={i} id={i}>
      <Holoplay id={hololive.id} url={hololive.room} width={300} height={100}/>
    </div> } */



  onBreakpointChange(breakpoint,cols) {
    this.setState({
      currentBreakpoint: breakpoint ,
      cols:cols
    });
  }

  onCompactTypeChange() {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
          ? null
          : "horizontal";
    this.setState({ compactType });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);

    this.setState({ items: _.map(layout,(l,i)=>{
        return {
          i: l.i,
          x: l.x,
          y: l.y,
          w: l.w,
          h: l.h,
          id:this.state.todaylive[i].id,
          room:this.state.todaylive[i].room
  
        }
    })});
  }



  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
      color:'white'
    };
    const i =  el.i;
    return (
      <div key={i} data-grid={el} style={{justifyContent:'center',justifyItems:'center'}}>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${el.room}`} controls={true} width='100%'
          height='95%'/>
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }


  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  



  render() {
    return (
      <div style={{flex:1,backgroundColor:'transparent'}}>
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
        {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

GirdLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired
};

GirdLayout.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: function() {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  initialLayout: GirdLayout.generateLayout
};

