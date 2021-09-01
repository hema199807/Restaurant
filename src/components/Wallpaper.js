import React from 'react';
import '../styles/Home.css';
import axios from 'axios';
import WallpaperSearch from './WallpaperSearch';



class Wallpaper extends React.Component{
    constructor(){
        super();
        this.state={
            restaurants:[]
        }
    }

    

    handlechange=(event)=>{
        const area=event.target.value.split('-')[0];
        const city=event.target.value.split('-')[1];

        sessionStorage.setItem('area',area);
        sessionStorage.setItem('city',city);
        
        axios({
            method:'GET',
            url:`http://localhost:300/restaurantbycity/${area}`,
            headers:{'Content-type':'application/json'}
        }).then(res=>this.setState({restaurants:res.data.restaurantlist}))
           .catch(err=>console.log(err))
    }      
    
    render(){
        const {location}=this.props;
        const {restaurants}=this.state;
        return(
            <React.Fragment>
                <img src={require("../assets/homepageimg.png")} style={{width:'100%',height:'450px',margin:'auto'}}/>
                    <div>
                        <div className="homelogo">
                            <p>e!</p>
                        </div>
                        <div className="headings">
                            Find the best restaurants, cafes, bars
                        </div>
                       <div className="locationSelector">
                            <select className="locationDropdown" onChange={this.handlechange}>
                              <option value='0'>Select</option>
                              {location.map((item,index)=>{
                                   return <option key={index} value={`${item.location_id}-${item.city_id}`}>{`${item.name},${item.city}`}</option>
                              })}
                              
                            </select>
                            <div>
                                <WallpaperSearch restaurants={restaurants}/>
                            </div>
                    
                       </div>
                    </div>
           </React.Fragment>   
        )  
    }
}
export default Wallpaper;