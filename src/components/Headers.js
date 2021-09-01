import React from 'react';
import '../styles/Header.css';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '50%',
      height                :  '60%',
      background            : 'aliceblue'
    }
};
const customStyles1 = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '3px',
        backgroundColor: 'black',
        border: 'solid 2px brown',
        width: '50%',
        height: '68%'
    }
};

class Header extends React.Component{
    constructor(){
        super();
        
        this.state={
            signUpModelIsOpen:false,
            loginModelIsOpen:false,
            orderssmodelIsOpen:false,
            email:'',
            pwd:'',
            FN:'',
            LN:'',
            isLoggedIn:false,
            orders:[],
            
        }
    }
   
    handlesignup=()=>{
        this.setState({signUpModelIsOpen:true})      
    }
    handlelogin=()=>{
        this.setState({loginModelIsOpen:true}) 
       
    }
    handlesignupcancel=()=>{
        this.setState({signUpModelIsOpen:false,email:'',pwd:'',FN:'',LN:''}) 
    }
    handlelogincancel=()=>{
        this.setState({loginModelIsOpen:false})
    }
    handlechange=(event,state)=>{
        this.setState({[state]:event.target.value})
    }
    handlelogsignup=()=>{
        this.setState({loginModelIsOpen:false,signUpModelIsOpen:true}) 
    }
  
    signup=()=>{
        const {email,pwd,FN,LN}=this.state
        const obj={
            Email:email,
            Password:pwd,
            FirstName:FN,
            LastName:LN
        }
        if(!email || !pwd || !FN || !LN){
            
            toast("all fields required");
        }
        
        axios({
            method:'POST',
            url:'http://localhost:300/signup',
            headers:{'Content-Type':'application/json'},
            data:obj
        })
        
        .then(response=>{
            if(response.data.message==='Account already exit, please login'){
                this.setState({
                    email:'',
                    pwd:'',
                    FN:'',
                    LN:'',
                    loginModelIsOpen:true  
                })
                alert(response.data.message);
            }
            
            if(response.data.message==='Account Created Sucessfully'){
                
                this.setState({signUpModelIsOpen:false,
                    email:'',
                    pwd:'',
                    FN:'',
                    LN:''
                })
                alert(response.data.message)
                
            }
            
           
            
        })
        .catch(err=>console.log(err))

    }
    login=()=>{
        const {email,pwd}=this.state
        const obj={
            Email:email,
            Password:pwd,
            
        }
        
        axios({
            method:"POST",
            url:'http://localhost:300/login',
            headers:{'Content-Type':'application/json'},
            data:obj
        })
        .then(response=>{
           
            this.setState({isLoggedIn:response.data.isAthunticated,loginModelIsOpen:false})
            if(response.data.isAthunticated==false){
            alert('plese create an account');
            }
            else{
                alert(response.data.message);
            }
            sessionStorage.setItem('isLoggedIn',response.data.isAthunticated);
        }).catch(err=>console.log(err))
    }
    Navigation=()=>{
        this.props.history.push('/');
    }
    handleorder=()=>{
      
        const email=sessionStorage.getItem('email');
       
        axios({
            method:'GET',
            url:`http://localhost:300/getorders/${email}`,
            headers:{'Content-Type':'aplication/json'}
        })
        .then(response=>{
        this.setState({orders:response.data.orderlist,orderssmodelIsOpen:true})
        })
        .catch(err=>console.log(err))
    }
    
    handleorderClose=()=>{
        this.setState({orderssmodelIsOpen:false})
    }
    cancelorder=(id)=>{
        const {orders}=this.state;

        axios({
            method:'DELETE',
            url:`http://localhost:300/deleteorderbyid/${id}`,
            headers:{'Content-Type':'aplication/json'}
        })
        let order=orders
        order=order.filter(item=>item._id!=id)
        this.setState({orders:order})
    }
    render(){
        const {signUpModelIsOpen,email,pwd,FN,LN,loginModelIsOpen,orderssmodelIsOpen,orders}=this.state
        
        return(
            <React.Fragment>
                <div style={{width:'100%',height:'50px',backgroundColor:'red'}}>
                    <div className="btn-group">
                    <button onClick={this.handlelogin} className="btn">Login</button>
                    <button onClick={this.handlesignup} className="btnc">Create an account</button>
                    
                    <button onClick={this.handleorder} className="btn">Order</button>
                   
                    </div>
                    
                    <p className="logo" onClick={this.Navigation}>e!</p>


                    <Modal
                       isOpen={signUpModelIsOpen}
                       style={customStyles}
                    >
                        
                        <div>
                            <h3 className="mlogin">Create an account</h3>
                            <div className="mcEmail"><span>Email: </span><input type="text" value={email} onChange={(event)=>this.handlechange(event,'email')}/></div>
                            <div className="mcemail"><span>Password: </span><input type="password" value={pwd} onChange={(event)=>this.handlechange(event,'pwd')}/></div>
                            <div className="mcemail"><span>FirstName: </span><input type="text" value={FN} onChange={(event)=>this.handlechange(event,'FN')}/></div>
                            <div className="mcemail"><span>LastName: </span><input type="text" value={LN} onChange={(event)=>this.handlechange(event,'LN')}/></div>
                            <button onClick={this.signup} className="btnac">Signup</button>
                            <ToastContainer />
                           
                             <button onClick={this.handlesignupcancel} className="btnacc">Cancel</button>
                        </div>
                    </Modal>  


                    <Modal
                       isOpen={loginModelIsOpen}
                       style={customStyles}
                    >
                        
                        <div>
                            <h3 className="mlogin">Login</h3>
                            <div className="memail"><input type="text" placeholder="Enter mail id" value={email} onChange={(event)=>this.handlechange(event,'email')}/></div>
                            <div className="memail"><input type="password" placeholder="Enter password" value={pwd} onChange={(event)=>this.handlechange(event,'pwd')}/></div>
                            <button onClick={this.login} className="btnlogin">Login</button>
                            <button onClick={this.handlelogincancel} className="btncancel">Cancel</button>
                            <div className="lisign">Don't have an account?<a onClick={this.handlelogsignup}>SignUp</a></div>
                           
                        </div>
                    </Modal> 
                    <Modal
                       isOpen={orderssmodelIsOpen}
                       style={customStyles1}
                    >
                        <button className="btn btn-sm btn-danger" style={{ float: 'right'}} onClick={this.handleorderClose}>❌</button>
                        
                        <div className="container-fluid">
                            <div className="row">
                            
                                <div className="col-sm-12 col-md-12 col-lg-4">
                                {orders.map((item)=>{
                                             return <div>
                                                 <div style={{color:"white",marginLeft: "35px"}}>emailId:-{item.email}</div>
                                               <div style={{color:"white",marginLeft: "35px"}}>orderId:-{item._id}</div>
                                               <div style={{color:"white",marginLeft: "35px"}}>status: {item.status}</div>
                                             {item &&item.ordered_items && item.ordered_items.map((item)=>{
                                                return <div className="itContainer">
                                                <div className="Modelheading">{item.restaurant_name +' Restaurant'}</div>
                                                 <div className="imgContainer">
                                                     <img className="itemimg" src={item.image} />
                                                 </div>
                                                 <div className="addorder">
                                                   <span>quantity={item.quantity} </span>
                                                  </div>
                                                 <div className="contentcontainer">
                                                     <div className="itemheading">
                                                         {item.name}
                                                     </div>
                                                     <div className="itemSubHeading">
                                                         {item.description}
                                                     </div>
                                                     
                                                     <div className="itemsubheadind1">{item.ingridients !=undefined? item.ingridients + ',':null}</div>
                                                     <div className="cost">&#8377;{item.cost !=undefined? item.cost*item.quantity:null}</div>
                                                 </div>
                                                 
                                              </div>
                                               
                                              
                                            })}
                                            {item && item.ordered_items && item.ordered_items.length>0?
                            <div className="Total">TOTAL : &#8377; {(`${item && item.ordered_items && item.ordered_items.reduce((sum,{cost,quantity})=>sum+cost*quantity,0)}`)}
                            <div><button className="ordercan" onClick={()=>{this.cancelorder(item._id)}}>Order Cancel</button></div>
                           </div>:null}
                                            </div>
                                            })}
                                        </div>
                                            
                                    </div>
                                   
                            </div>     
    
                    </Modal>

          
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(Header);