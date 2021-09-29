import React from 'react';
import '../styles/Home.css';
import Wallpaper from './Wallpaper';
import Quicksearch from './Quicksearch';
import axios from 'axios';

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            location:[],
            meal_type:[]
        }
    }
    componentDidMount(){
        sessionStorage.setItem('area',undefined);
        sessionStorage.setItem('city',undefined);
        axios({
            method:'GET',
            url:'https://foodproductapp.herokuapp.com/location',
            headers:{'Content-Type':'aplication/json'}
        })
        .then(response=>{
            this.setState({location:response.data.locationlist})
        })
        .catch(err=>console.log(err))


        axios({
            method:'GET',
            url:'https://foodproductapp.herokuapp.com/mealtype',
            headers:{'Content-Type':'aplication/json'}
        })
        .then(response=>{
            this.setState({meal_type:response.data.mealtypelist})
        })
        .catch(err=>console.log(err))
    }
    render(){
        const {location,meal_type}=this.state;
        return(
            <React.Fragment>
                <Wallpaper location={location}/>
                <Quicksearch meal_type={meal_type}/>
               


            </React.Fragment>
        )
    }
}
export default Home;