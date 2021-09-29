import React from 'react';
import '../styles/Search.css';
import axios from 'axios';
import queryString from 'query-string';


class Search extends React.Component{
   constructor(){
       super();
       this.state={
           restaurants:[],
           location:[],
           pagecount:[],
           location_id:undefined,
           mealtype:undefined,
           cuisine:[],
           lcost:undefined,
           hcost:undefined,
           sort:1,
           page:1
       }
   }
   componentDidMount(){
       const queryParams=queryString.parse(this.props.location.search);
       const locationid=queryParams.area;
       const mealtypes=queryParams.mealtype;
       
       const {sort,page}=this.state;
      

       const filterobj={
        location_id:Number(locationid),
        mealtype:Number(mealtypes),
        sort:sort,
        page:page
       };
       axios({
            method:'Post',
            url:' https://foodproductapp.herokuapp.com/filterdata',
            headers:{'Content-Type':'application/json'},
            data:filterobj
       }).then(res=>this.setState({restaurants:res.data.restaurant,pagecount:res.data.pageCount,mealtype:Number(mealtypes),location_id:Number(locationid)}))
       .catch(err=>console.log(err))
      
       axios({
            method:'GET',
            url:' https://foodproductapp.herokuapp.com/location',
            headers:{'Content-Type':'application/json'},
       }).then(res=>this.setState({location:res.data.locationlist}))
         .catch(err=>console.log(err))
   }
   
    handleclick=(id)=>{
       this.props.history.push(`/details/?restaurantid=${id}`)
    }
    handlelocationchange=(event)=>{
        const area=event.target.value.split('-')[0];

        const {lcost,hcost,mealtype,sort,page,cuisine}=this.state;
        const filterobj={
            mealtype:mealtype,
            location_id:Number(area),
            cuisine:cuisine.length !=0 ? cuisine : undefined,
            sort:sort,
            lcost:lcost,
            hcost:hcost,
            page:page
        }
        this.props.history.push(`/search/?area=${area}&mealtype=${mealtype}&cuisine=${cuisine}&costlessthan=${hcost}&costgreaterthan=${lcost}&sort=${sort}&page=${page}`)
        axios({
            method:'Post',
            url:' https://foodproductapp.herokuapp.com/filterdata',
            headers:{'Content-Type':'application/json'},
            data:filterobj
       }).then(res=>this.setState({restaurants:res.data.restaurant,pagecount:res.data.pageCount,location_id:Number(area)}))
       .catch(err=>console.log(err))
    }
    handleCuisinechange=(cuisineId)=>{
        const {cuisine,location_id,lcost,hcost,mealtype,sort,page}=this.state;
          
        if (cuisine.indexOf(cuisineId) == -1) {
           
            cuisine.push(cuisineId);
        }
        else {
            var index = cuisine.indexOf(cuisineId);
            cuisine.splice(index, 1);
        }
        const filterobj={
            location_id:location_id,
            mealtype:mealtype,
            cuisine:cuisine.length !=0 ? cuisine : undefined,
            lcost:lcost,
            hcost:hcost,
            sort:sort,
           page:page
        }
        this.props.history.push(`/search/?area=${location_id}&mealtype=${mealtype}&cuisine=${cuisine}&costlessthan=${hcost}&costgreaterthan=${lcost}&sort=${sort}&page=${page}`)
        axios({
            method:'Post',
            url:' https://foodproductapp.herokuapp.com/filterdata',
            headers:{'Content-Type':'application/json'},
            data:filterobj
       }).then(res=>this.setState({restaurants:res.data.restaurant,pagecount:res.data.pageCount,cuisine:cuisine}))
       .catch(err=>console.log(err))

    }
    handlesortChange=(sort)=>{
        const {lcost,hcost,mealtype,location_id,cuisine,page}=this.state
        const filterobj={
            location_id:location_id,
            mealtype:mealtype,
            cuisine:cuisine.length !=0 ? cuisine : undefined,
            sort:Number(sort),
            lcost:lcost,
            hcost:hcost,
            page:page
           };
           this.props.history.push(`/search/?area=${location_id}&mealtype=${mealtype}&cuisine=${cuisine}&costlessthan=${hcost}&costgreaterthan=${lcost}&sort=${sort}&page=${page}`)
           axios({
                method:'Post',
                url:' https://foodproductapp.herokuapp.com/filterdata',
                headers:{'Content-Type':'application/json'},
                data:filterobj
           }).then(res=>this.setState({restaurants:res.data.restaurant,pagecount:res.data.pageCount,sort:Number(sort)}))
           .catch(err=>console.log(err))
    }
    handlecostChange=(lcost,hcost)=>{
           const {sort,mealtype,location_id,cuisine,page}=this.state;
        const filterobj={
            location_id:location_id,
            mealtype:mealtype,
            cuisine:cuisine.length !=0 ? cuisine : undefined,
            sort:sort,
            lcost:Number(lcost),
            hcost:Number(hcost),
            page:page
           };
           this.props.history.push(`/search/?area=${location_id}&mealtype=${mealtype}&cuisine=${cuisine}&costlessthan=${hcost}&costgreaterthan=${lcost}&sort=${sort}&page=${page}`)
           axios({
                method:'Post',
                url:' https://foodproductapp.herokuapp.com/filterdata',
                headers:{'Content-Type':'application/json'},
                data:filterobj
           }).then(res=>this.setState({restaurants:res.data.restaurant,pagecount:res.data.pageCount,lcost:Number(lcost),hcost:Number(hcost)}))
           .catch(err=>console.log(err))
    }
    handlepageclick=(pageNumber)=>{
        const page=pageNumber;
        const {lcost,hcost,mealtype,location_id,cuisine,sort}=this.state;
        const filterobj={
            location_id:location_id,
            mealtype:mealtype,
            cuisine:cuisine.length !=0 ? cuisine : undefined,
            sort:sort,
            lcost:lcost,
            hcost:hcost,
            page:page
           };
           this.props.history.push(`/search/?area=${location_id}&mealtype=${mealtype}&cuisine=${cuisine}&costlessthan=${hcost}&costgreaterthan=${lcost}&sort=${sort}&page=${page}`)
           axios({
                method:'Post',
                url:' https://foodproductapp.herokuapp.com/filterdata',
                headers:{'Content-Type':'application/json'},
                data:filterobj
           }).then(res=>this.setState({restaurants:res.data.restaurant,pagecount:res.data.pageCount,page:page}))
           .catch(err=>console.log(err))

    }
    render(){
        const {restaurants,pagecount,location,sort}=this.state;
        const name=sessionStorage.getItem('mealtype_name');
       
        return(
            <React.Fragment>
                 <div>
                    <div id="myId" className="heading">{name}</div>
                    <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                    <span className="glyphicon glyphicon-th-list toggle-span" data-toggle="collapse"
                        data-target="#demo"></span>
                    <div id="demo" className="collapse show">
                        <div className="filter-heading">Filters</div>
                        <div className="Select-Location">Select Location</div>
                        <select className="Rectangle-2236" onChange={this.handlelocationchange}>
                            <option>Select</option>
                            {location.map((item)=>{
                                   return <option value={`${item.location_id}-${item.city_id}`}>{`${item.name},${item.city}`}</option>
                              })}
                        </select>
                        <div className="Cuisine">Cuisine</div>
                        <div style={{display: "block"}}>
                            <input type="checkbox" value='1' onChange={()=>this.handleCuisinechange(1)}/>
                            <span className="checkbox-items">North Indian</span>
                        </div>
                        <div style={{display: "block"}}>
                            <input type="checkbox" value='2' onChange={()=>this.handleCuisinechange(2)}/>
                            <span className="checkbox-items">South Indian</span>
                        </div>
                        <div style={{display: "block"}}>
                            <input type="checkbox" value='3' onChange={()=>this.handleCuisinechange(3)}/>
                            <span className="checkbox-items">Chineese</span>
                        </div>
                        <div style={{display: "block"}}>
                            <input type="checkbox" value='4' onChange={()=>this.handleCuisinechange(4)}/>
                            <span className="checkbox-items">Fast Food</span>
                        </div>
                        <div style={{display: "block"}}>
                            <input type="checkbox" value='5' onChange={()=>this.handleCuisinechange(5)}/>
                            <span className="checkbox-items">Street Food</span>
                        </div>
                        <div className="Cost-for-two">Cost For Two</div>
                        <div style={{display: "block"}}>
                            <input type="radio" name='cost' onChange={()=>this.handlecostChange(1,500)}/>
                            <span className="checkbox-items">Less than &#8377; 500</span>
                        </div>
                        <div style={{display: "block"}}>
                            <input type="radio" name='cost' onChange={()=>this.handlecostChange(500,1000)}/>
                            <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                        </div>
                        <div style={{display: "block"}}>
                            <input type="radio" name='cost' onChange={()=>this.handlecostChange(1000,1500)}/>
                            <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                        </div>
                        <div style={{display: "block"}}>
                            <input type="radio" name='cost' onChange={()=>this.handlecostChange(1500,2000)}/>
                            <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                        </div>
                        <div style={{display: "block"}}>
                            <input type="radio" name='cost' onChange={()=>this.handlecostChange(2000,10000)}/>
                            <span className="checkbox-items">&#8377; 2000+</span>
                        </div>
                        <div style={{display: "block"}}>
                            <input type="radio" name='cost' onChange={()=>this.handlecostChange(1,10000)}/>
                            <span className="checkbox-items">&#8377; All</span>
                        </div>
                        <div className="Cuisine">Sort</div>
                        <div style={{display: "block"}}>
                            <input type="radio" name='sort' checked={sort==1} onChange={()=>this.handlesortChange('1')}/>
                            <span className="checkbox-items">Price low to high</span>
                        </div>
                        <div style={{display: "block"}}>
                            <input type="radio" name='sort' checked={sort==-1} onChange={()=>this.handlesortChange('-1')}/>
                            <span className="checkbox-items">Price high to low</span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-9 col-md-9 col-lg-9 scroll">
                    {restaurants.length > 0 ? restaurants.map((item)=>{
                        
                        return <div className="Item" onClick={()=>this.handleclick(item._id)}>
                        <div className="row pl-1">
                            <div className="col-sm-4 col-md-4 col-lg-4">
                            
                                
                                {item.thumb && <img className="img" src={item.thumb[0]}/>}
                            </div>
                            <div className="col-sm-8 col-md-8 col-lg-8">
                                <div className="rest-name">{item.name}</div>
                                <div className="res-location">{item.locality},{item.city_name}</div>
                                <div className="rest-address">{item.address}</div>
                            </div>
                        </div>
                        <hr />
                        <div className="row padding-left">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="rest-address">CUISINES : {item.cuisine.map((item)=> item.name + ', ')}</div>
                                <div className="rest-address">COST FOR TWO :{item.cost} </div>
                            </div>
                        </div>
                        </div>
                    }):<div className='no-data'>NO DATA FOUND</div>}
                    
                   
                    {pagecount.length>=1 && <div className="pagination">
                        <a href="#">&laquo;</a>
                        {pagecount.map((item)=>{
                            return <a href="#" onClick={()=>this.handlepageclick(item)}>{item}</a>
                        })}  
                        <a href="#">&raquo;</a>
                    </div>}
                </div>
            </div>
        </div>
    </div>
            </React.Fragment>
        )
    }
}
export default Search;