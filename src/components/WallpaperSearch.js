import React from 'react';
import '../styles/Home.css';

import {withRouter} from 'react-router-dom';


class WallpaperSearch extends React.Component{

    constructor(props){
        super(props);
        this.state={
            suggestions:[],
            text:""
            
        }
    }
    onTextchange=(event)=>{
        const value=event.target.value;
        const {restaurants}=this.props;
        let suggestions=[];
        
        if(value.length>0){
            suggestions=restaurants.filter(item=> item.name.toLowerCase().includes(value.toLowerCase()))
        }
        this.setState(()=>({
            suggestions:suggestions,
            text:value
        }))
    }
    selectedtext(value){
        this.setState({
            text:value.name,
            suggestions:[],
        },()=>{
            this.props.history.push(`/details/?restaurantid=${value._id}`);
        })
    }

    renderSuggestions=()=>{
        let {suggestions}=this.state;

        if(suggestions.length===0){
            return null;
        }
        return(
            <ul>
                {
                    suggestions.map((item,index)=>(<li className="searchhome" key={index} onClick={()=>this.selectedtext(item)}>{item.name}</li>))
                }
            </ul>
        )
    }

       
    
    render(){
       
        const {text}=this.state;
        return(
            <React.Fragment>
                
                           
                                
                                    <input className="restaurantsinput" type="text" placeholder="Please Enter Restaurant Name" onChange={this.onTextchange} value={text}/>
                                    {this.renderSuggestions()}
                                
                              <span className="glyphicon glyphicon-search search"></span>
                           
                       
                    
           </React.Fragment>   
        )  
    }
}
export default withRouter(WallpaperSearch);