import React, { Component } from 'react';
import "./Style.css";
import axios from 'axios';
import ReactPaginate from 'react-paginate';


const API_URL ="http://dummy.restapiexample.com/api/v1/employees"

let getId=''
class Task extends Component{

     state =  {
                 id:"",
                employee_name:"",
                employee_salary:"",
                employee_age:"",
                successs:true,
                list:[],
                tableData:[],
                _id:'',
                value:false,
                offset:0,
                perPage:5,
                currentPage:0,
                query:'',
                open:false,
                search:"" ,           
         };

    handleClick(_id){
        const list=this.state.list.filter(list=>list.id!==_id);
        this.setState({
           list:list
        })
    }

    update(e,key,name,salary,age){
        getId=e.target.id
        console.log(getId)
       this.setState({
           id:key,
           employee_name:name,
           employee_age:age,
           employee_salary:salary,
       })
       document.getElementById('add').style.display='none'
       document.getElementById('update').style.display='block'
       
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    componentDidMount(){
        this.receivedData()
    }

    receivedData(){
        axios.get(API_URL)
        .then(res=>{
            const data=res.data.data
            var slice=data.slice(this.state.offset,this.state.offset+this.state.perPage)
            this.setState({
                pageCount:Math.ceil(data.length/this.state.perPage),
                list:slice,
            })
        })     
    }

   handleSearch(e){
       this.setState({
           search:e.target.value
       })
   }

   updateItem(e){
       let newList=this.state.list
        newList[getId].employee_name=this.state.employee_name
        newList[getId].id=this.state.id
       newList[getId].employee_salary=this.state.employee_salary
       newList[getId].employee_age=this.state.employee_age
       
       this.setState({
           list:newList,
           employee_salary:"",
           id:"",
           employee_name:"",
           employee_age:""
       })
       document.getElementById('add').style.display='block'
       document.getElementById('update').style.display='none'
   }
    addItem=()=>{
         let {id,employee_age,employee_name,employee_salary}=this.state;
         let AddItem={
             id,
             employee_age,
             employee_name,
             employee_salary
         }

        let olditem=[...this.state.list,{
            ...AddItem,
           
        }];
        console.log(olditem)
            this.setState({
                list: olditem,
                employee_name:"",
                id:"",
                employee_age:"",
                employee_salary:""
            })
            
        }

        handleInput=(e)=>{
            this.setState({ [e.target.id] : e.target.value })
           }

    render(){
        return(
                <div>
                    <div className="container">
                     <input className="txt"  placeholder="Search..." onChange={(e)=>this.handleSearch(e)}/>
                         <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Employee Name</th>
                                    <th scope="col">Employee Salary</th>
                                    <th scope="col">Employee Age</th>
                                    <th scope="col">Delete</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td className="ChangeText_color">
                                        <input id="id" value={this.state.id} onChange={this.handleInput}type="number"/>
                                        </td>
                                        <td className="ChangeText_color">
                                        <input value={this.state.employee_name} id="employee_name" onChange={this.handleInput} type="text" />
                                        </td>
                                        <td className="ChangeText_color">
                                        <input value={this.state.employee_salary} id="employee_salary" onChange={this.handleInput} type="text"/>
                                        </td>
                                        <td className="ChangeText_color">
                                        <input value={this.state.employee_age} id="employee_age" onChange={this.handleInput} type="text"/>
                                        </td>
                                            <td className="ChangeText_color">
                                            <button id="add" onClick={()=>this.addItem()} className="btn btn-success btn-lg active">Add</button>
                                        </td>
                                        <td className="ChangeText_color">
                                            <button id="update" onClick={()=>this.updateItem()} className="btn btn-success btn-lg active">Update</button>
                                        </td>
                                       
                                        
                                    </tr>
                                         {
                                       this.state.list.filter((data,i)=>{
                                      if(this.state.search == "") 
                                          return data
                                      
                                      else if(data.employee_name.toLowerCase().includes(this.state.search.toLowerCase()) || data.employee_age.toLowerCase().includes(this.state.search.toLowerCase())){
                                          return data
                                      }   
                                    }).map((data,i)=>{
                                        return(
                                        <tr key={i}>
                                        <td className="ChangeText_color">
                                            {data.id}
                                        </td>
                                        <td className="ChangeText_color">
                                            {data.employee_name}
                                        </td>
                                        <td className="ChangeText_color">
                                            {data.employee_salary}
                                        </td>
                                        <td className="ChangeText_color">
                                            {data.employee_age}
                                        </td>
                                          
                                        <td className="ChangeText_color">
                                            <button className="btn btn-danger btn-lg active" onChange={this.handleChange} primary={false} onClick={() => this.handleClick(data.id)}>Delete</button>
                                        </td>
                                        <td className="ChangeText_color">
                                            <button id={i}className="btn btn-success btn-lg active" onChange={this.handleChange} primary={false} onClick={(e) => this.update(e,data.id,data.employee_name,data.employee_salary,data.employee_age)}>Edit</button>
                                        </td>
                                        
                                    </tr>
                                        )
                                    })        
                                }    
                            </tbody>
                        </table>
                            <ReactPaginate
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}/>
                    </div>
                </div>
        );
    }
}

export default Task;