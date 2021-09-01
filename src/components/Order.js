import React from 'react';
import '../styles/Details.css';
import Modal from 'react-modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from 'react-router-dom';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '3px',
        backgroundColor: 'white',
        border: 'solid 2px brown',
        width: '39%',
        height: '80%'
        
    }
};


class SaveOrder extends React.Component{
    constructor(){
        super();
        this.state={
            signUpModelIsOpen:false,
            loginModelIsOpen:false,
            Email:'',
            pwd:'',
            FN:'',
            LN:'',
            isLoggedIno:false,
            orderdetailsIsOpen:false,
            email:'',
            name:'',
            mob_no:'',
            address:'',
            saveorder:[],
            payModel:false
        }
        
    }
    
    handlesignupcancel=()=>{
        this.setState({signUpModelIsOpen:false}) 
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
        const {Email,pwd,FN,LN}=this.state
        const obj={
            Email:Email,
            Password:pwd,
            FirstName:FN,
            LastName:LN
        }
        if(!Email || !pwd || !FN || !LN){
            
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
                    Email:'',
                    pwd:'',
                    FN:'',
                    LN:'',
                    loginModelIsOpen:true  
                })
                alert(response.data.message);
            }
            
            if(response.data.message==='Account Created Sucessfully'){
                
                this.setState({signUpModelIsOpen:false,
                    Email:'',
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
        const {Email,pwd}=this.state
        const obj={
            Email:Email,
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
            this.setState({signUpModelIsOpen:true})
            }
            else{
                alert(response.data.message);
            }
            sessionStorage.setItem('isLoggedIn',response.data.isAthunticated);
        }).catch(err=>console.log(err))
    }
    handleprocced=()=>{  
       
        this.setState({orderdetailsIsOpen:true})
      
    }
    handleClose = () => {
        this.setState({orderdetailsIsOpen:false})
    }
    handlechange=(event,state)=>{
        this.setState({[state]:event.target.value})
    }
    handlesave=()=>{
        const {name,email,mob_no,address}=this.state;
        
        if(!email|!name|!mob_no|!address){
            
            toast("all fields required");
        }else{
            this.setState({email:email,name:name,mob_no:mob_no,address:address,payModel:true})
        }
       
    }
    navigate=()=>{
        const {name,email,mob_no,address,isLoggedIno}=this.state;
        const items=JSON.parse(localStorage.getItem('carts'));
        const obj={
            name:name,
           email:email,
            mobile_number:mob_no,
            address:address,
            ordered_items:items,
            
        }
        if((isLoggedIno==true)||(sessionStorage.getItem('isLoggedIn'))){
            axios({
                method:'POST',
                url:'http://localhost:300/saveorderdetails',
                headers:{'Content-Type':'application/json'},
                data:obj
            })
            
            .then(response=>{this.setState({saveorder:response.data.result})
            sessionStorage.setItem('email',email);
                
            }).catch(err=>console.log(err))
            this.props.history.push('/');
            }
            else{
                alert('plese login');
                this.setState({loginModelIsOpen:true}) 
            }
      
    }
    
    render(){
        const {signUpModelIsOpen,Email,pwd,FN,LN,loginModelIsOpen,orderdetailsIsOpen,email,name,mob_no,address,payModel}=this.state;
        const {carts}=this.props;
  
        return(
            <React.Fragment>
            <div className="Total">TOTAL : &#8377; {(`${carts.reduce((sum,{cost,quantity})=>sum+cost*quantity,0)}`)}
            <span><button className="Pro" onClick={this.handleprocced}>Procced</button></span>
            
            </div>
            <Modal
                isOpen={orderdetailsIsOpen}
                style={customStyles}
            >
                
                <button className="btn btn-sm btn-danger" style={{ float: 'right'}} onClick={this.handleClose}>❌</button>
               
                 <form>
                    
                    <label className="headlabel" style={{marginTop:'43px',marginLeft:'19px'}}>Name:</label><br/>
                    <input type="text" placeholder="Enter Name" className="text-box" value={name} onChange={(event)=>this.handlechange(event,'name')}/> <br/>
                    <label className="headlabel" style={{marginTop:'13px',marginLeft:'19px'}}>Email:</label><br/>
                    <input type="text" placeholder="Enter mail id" className="text-box" value={email} onChange={(event)=>this.handlechange(event,'email')}/> <br/>
                    <label className="headlabel" style={{marginTop:'13px',marginLeft:'19px'}}>Mobile Number:</label><br/>
                    <input type="text" placeholder="Enter Mobile Number" className="text-box" value={mob_no} onChange={(event)=>this.handlechange(event,'mob_no')}/><br/>
                    <label className="headlabel" style={{marginTop:'13px',marginLeft:'19px'}}>Address:</label><br/>
                    <textarea name="message" rows="7" cols="50" style={{marginLeft:'19px'}} value={address} onChange={(event)=>this.handlechange(event,'address')}>Enter Address</textarea>
                    

                </form>
                       <button className="btnsave" onClick={this.handlesave}>Procced To Pay</button>
                      
                      
                <ToastContainer />
            </Modal>
            <Modal
                isOpen={payModel}
                style={customStyles}
            >
                <div className="pay">
                <button className="btn btn-sm btn-danger" onClick={this.navigate}>Pay Now</button>
                </div>
            </Modal>
            <Modal
                isOpen={loginModelIsOpen}
                style={customStyles}
            >
                        
                <div>
                    <h3 className="mlogin">Login</h3>
                    <div className="memail"><input type="text" placeholder="Enter mail id" value={Email} onChange={(event)=>this.handlechange(event,'Email')}/></div>
                    <div className="memail"><input type="password" placeholder="Enter password" value={pwd} onChange={(event)=>this.handlechange(event,'pwd')}/></div>
                    <button onClick={this.login} className="btnlogin">Login</button>
                    <button onClick={this.handlelogincancel} className="btncancel">Cancel</button>
                    <div className="lisign">Don't have an account?<a onClick={this.handlelogsignup}>SignUp</a></div>
                           
                </div>
            </Modal>
            <Modal
                isOpen={signUpModelIsOpen}
                style={customStyles}
            >
                        
                <div>
                    <h3 className="mlogin">Create an account</h3>
                    <div className="mcEmail"><span>Email: </span><input type="text" value={Email} onChange={(event)=>this.handlechange(event,'Email')}/></div>
                    <div className="mcemail"><span>Password: </span><input type="password" value={pwd} onChange={(event)=>this.handlechange(event,'pwd')}/></div>
                    <div className="mcemail"><span>FirstName: </span><input type="text" value={FN} onChange={(event)=>this.handlechange(event,'FN')}/></div>
                    <div className="mcemail"><span>LastName: </span><input type="text" value={LN} onChange={(event)=>this.handlechange(event,'LN')}/></div>
                    <button onClick={this.signup} className="btnac">Signup</button>
                    <ToastContainer />
                           
                    <button onClick={this.handlesignupcancel} className="btnacc">Cancel</button>
                </div>
            </Modal>  

            </React.Fragment>
        )
    }
}
export default withRouter(SaveOrder);