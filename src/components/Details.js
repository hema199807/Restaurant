import React from 'react';
import '../styles/Details.css';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-modal';
import queryString from 'query-string';
import Orderitems from '../components/items';


 
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '3px',
        backgroundColor: 'black',
        border: 'solid 2px brown',
        width: '85%',
        height: '90%'
    }
};

class Details extends React.Component{
    constructor(){
        super();
        this.state={
            restaurant:{},
            modalIsOpen:false
        }
    }
    handleClick=()=>{
        this.setState({modalIsOpen:true})
    }
    handleClose = () => {
        this.setState({modalIsOpen:false})
    }
   
    componentDidMount(){
        const queryParams=queryString.parse(this.props.location.search);
        const restid=queryParams.restaurantid;
        axios({
           method:'GET',
           url:'https://foodproductapp.herokuapp.com/restaurantbyid/'+restid,
           headers:{'Content-Type':'application/json'}
        }).then(response=>{
            this.setState({restaurant:response.data.restaurantlistbyid})
        }).catch(err=>console.log(err))
    }
   
    render(){
        const{restaurant,modalIsOpen}=this.state;
        return(
            <div>
                {restaurant != null?
                <React.Fragment>
                    
                        <div>
                         {restaurant.thumb && <img src={restaurant.thumb[0]} width="100%" height="500px" />}
                         <button className="button" onClick={this.handleClick}>Click to see Image Gallery</button>
                        </div>
                        
                    <Modal
                        isOpen={modalIsOpen}
                        style={customStyles}
                    >
                       <button className="btn btn-sm btn-danger" style={{ float: 'right'}} onClick={this.handleClose}>❌</button>
                        <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} interval={3000} transitionTime={150}>
                        {restaurant && restaurant.thumb && restaurant.thumb.map((item)=>{
                        return <div>
                            <img src={item} alt="No Image, Sorry for the Inconvinience" style={{width:'100%',height:'450px',margin:'auto'}}/>
                            
                        </div>
                        })}
                        </Carousel>
                        
                    </Modal>
                    <div className="heading">{restaurant.name}</div>
                    
                        <div>
                            <Orderitems restaurant={restaurant}/>
                        </div>
                    <div className="tabs">
                        <div className="tab">
                            <input type="radio" id="tab-1" name="tab-group-1" checked/>
                            <label for="tab-1">Overview</label>

                            <div className="content">
                                <div className="about">About this place</div>
                                <div className="head">Cuisine</div>
                                
                                 <div className="Cuisinevalue">{restaurant.cuisine && restaurant.cuisine.map((item)=> item.name + ', ')}</div>
                               
                                <div className="head">Average Cost</div>
                                <div className="value">{restaurant.cost} for two people(approx)</div>
                            </div>
                        </div>

                        <div className="tab">
                            <input type="radio" id="tab-2" name="tab-group-1"/>
                            <label for="tab-2">Contact</label>
                            
                            <div className="content">
                                <div className="head">Phone Number</div>
                                <div className="value">{restaurant.contact_number}</div>
                                <div className="head">{restaurant.name}</div>
                                <div className="value">{restaurant.address}</div>
                            </div>
                        </div>
                    </div> 
                </React.Fragment>:null}
            </div>    
        )
    }
}
export default Details;