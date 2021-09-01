import React from 'react';
import '../styles/Home.css';
import {withRouter} from 'react-router-dom';


class Quicksearchitems extends React.Component{
    handleChange=(id,name,image)=>{
        const mealtype=id;
        sessionStorage.setItem('mealtype_name',name);
      
       const area=sessionStorage.getItem('area');
       const city=sessionStorage.getItem('city');
        this.props.history.push(`/search/?mealtype=${mealtype}&area=${area}&city=${city}`);
    }
    render(){
        const {id,name,content,image}=this.props;
        return(
            <React.Fragment>
                <div className="col-sm-12 col-md-12 col-lg-4" onClick={()=>this.handleChange(id,name,image)}>
                                <div className="tileContainer">
                                    <div className="tileComponent1">
                                       <img src={require("../"+image)} height="150" width="140" />
                                    </div>
                                    <div className="tileComponent2">
                                       <div className="componentHeading">
                                          {name}
                                        </div>
                                       <div className="componentSubHeading">
                                          {content}
                                       </div>
                                    </div>
                                </div>
                            </div>
            </React.Fragment>
        )
    }
}
export default withRouter(Quicksearchitems);