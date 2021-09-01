import React from 'react';
import '../styles/Home.css';
import Quicksearchitems from './Quicksearchitems';


class Quicksearch extends React.Component{
    render(){
        const {meal_type}=this.props;
        return(
          <React.Fragment>
                <div className="quicksearch">
                  <p className="quicksearchHeading">
                    Quick Searches
                  </p>
                 <p className="quicksearchSubHeading">
                  Discover restaurants by type of meal
                 </p>
                    <div className="container-fluid">
                        <div className="row">
                        {meal_type.map((item)=>{
                            return <Quicksearchitems id={item.meal_type} name={item.name} content={item.content} image={item.image}/>
                        })}   
               
                       </div>
                    </div>
                </div>
            </React.Fragment>
        )       
    }
}
export default Quicksearch;