import React from 'react';
import '../styles/Details.css';
import axios from 'axios';
import SaveOrder from '../components/Order';
import Modal from 'react-modal';





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
        width: '47%',
        height: '95%'
        
    }
};


class Orderitems extends React.Component{
    constructor(){
        super();
        this.state={
            ordermodelIsOpen:false,
            
            items:[],     
            
            carts:[]
            
        }
        
    }
   
  

    handleorderclick=(id)=>{
        const restid=id;
        axios({
                method:'GET',
                url:`http://localhost:300/getitemsbyrestaurantid/${restid}`,
                headers:{'Content-Type':'aplication/json'}
        })
        .then(response=>{
            this.setState({items:response.data.itemslistbyid,ordermodelIsOpen:true})
        })
        .catch(err=>console.log(err))
       
    }
    handleClose = () => {
        this.setState({ordermodelIsOpen:false,carts:[]})
    }
   
    addcart=(item)=>{
       const {carts}=this.state
       const cartstore=carts;
       const obj=cartstore.find(cartitem=> { return cartitem._id==item._id,cartitem.name==item.name})
       
       if(obj){
            obj.quantity+=1
        }
       else{
        if(item.quantity==0){
            item.quantity=1;
        }
           cartstore.push(item) 
          
        }
        this.setState({carts:cartstore});
        localStorage.setItem('carts',JSON.stringify(cartstore));  
    }
    Increment=(id)=>{
        const {carts}=this.state
       
        const cartstore=carts;
        const obj=cartstore.find(cartitem=> cartitem._id==id)
        
        
        if(!obj)
        return

            obj.quantity+=1
        this.setState({carts:cartstore,cartsmodelIsOpen:true});
        localStorage.setItem('carts',JSON.stringify(cartstore));   
    }
    Decrement=(id)=>{
        const {carts}=this.state
       
        let cartstore=carts;
        let obj=cartstore.find(cartitem=>cartitem._id==id)
        if(!obj)
        return  
      
        obj.quantity-=1
        if(obj.quantity<=0){
           cartstore=cartstore.filter(item=>item._id!=id)
             
        }
       
        this.setState({carts:cartstore});
        localStorage.setItem('carts',JSON.stringify(cartstore));   
    }
    remove=(item)=>{
        const {carts}=this.state
        let cartstore=carts;
        cartstore=cartstore.filter(cartitem=>cartitem._id!=item._id)
        item.quantity=1;
        this.setState({carts:cartstore});
        localStorage.setItem('carts',JSON.stringify(cartstore));   
    }
    render(){
        const {ordermodelIsOpen,items,carts}=this.state;
        
        const {restaurant}=this.props;
        return(
            
            <React.Fragment>
               <button className="ordbutton" onClick={()=>this.handleorderclick(restaurant.restaurant_id)}>Place online order</button>
                    <Modal
                        isOpen={ordermodelIsOpen}
                        style={customStyles}
                    >
                       <button className="btn btn-sm btn-danger" style={{ float: 'right'}} onClick={this.handleClose}>❌</button>
                        
                        <div className="container-fluid">
                            <div className="row">
                            
                                <div className="col-sm-12 col-md-12 col-lg-4">
                               {items.map((item)=>{
                                       return <div className="itContainer">
                                           <div className="Modelheading">{item.restaurant_name +' Restaurant'}</div>
                                            <div className="imgContainer">
                                                <img className="itemimg" src={item.image} />
                                            </div>
                                            <div className='adddiv'><button className='addbutton' onClick={()=>{this.addcart(item)}}>Add</button></div>
                                            

                                            <div className="contentcontainer">
                                                <div className="itemheading">
                                                    {item.name}
                                                </div>
                                                <div className="itemSubHeading">
                                                    {item.description}
                                                </div>
                                                
                                                <div className="itemsubheadind1">{item.ingridients !=undefined? item.ingridients + ',':null}</div>
                                                <div className="cost">&#8377;{item.cost !=undefined? item.cost:null}</div>
                                            </div>
                                            
                                            
                                            </div>
                                        })}
                                      
                                      {carts.map((item)=>{
                                            return <div className="itContainer">
                                                <div className="Modelheading">{item.restaurant_name +' Restaurant'}</div>
                                                 <div className="imgContainer">
                                                     <img className="itemimg" src={item.image} />
                                                 </div>
                                                 <div>
                                                     <button className="incBtn" onClick={()=>{this.Increment(item._id)}}>+</button>
                                                     <span><input className="inTx" type="text" placeholder={item.quantity} /></span>
                                                    <button className="decBtn" onClick={()=>{this.Decrement(item._id)}}>-</button>
                                                    <button className="remBtn" onClick={()=>{this.remove(item)}}>rem</button>                                            
                                                 </div>
                                                 <div className="contentcontainer">
                                                     <div className="itemheading">
                                                         {item.name}
                                                     </div>
                                                     <div className="itemSubHeading">
                                                         {item.description}
                                                     </div>
                                                     
                                                     <div className="itemsubheadind1">{item.ingridients !=undefined? item.ingridients + ',':null}</div>
                                                     <div className="cost">&#8377;{item.cost !=undefined? item.cost:null}</div>
                                                 </div>
                                               
                                              
                                            
                                              </div>
                                              
                                            })}
                                           
                                           
                                            
                                            
                                    </div>
                                   
                            </div>
                        </div>
                        {carts.length>0?
                            <div style={{width:'99%',height:'23px',backgroundColor:'red',position:'sticky',bottom: '0px'}}>
                                <SaveOrder carts={carts}  />
                        </div>:null}                 
                         
                        
                    </Modal>
                    
            </React.Fragment>
        )
    }
}
export default Orderitems;



