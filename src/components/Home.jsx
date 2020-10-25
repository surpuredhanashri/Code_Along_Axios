import React, { Component } from 'react';
import axios from 'axios';
import './Home.css'

export default class Home extends Component {
    constructor(){
        super();
        this.state = {

            //Get data
            datas : [],

            // Post data
            name : '',
            job : '',

            //Put data
            put_id : '',
            new_name : '',
            new_job : '',

            //Delete data
            delete_id : ''

        }
    }

    // Get Method
    componentDidMount(){
        axios.get("https://reqres.in/api/users/")
        .then( res => {
            console.log(res)
            this.setState({datas : res.data.data})})
        .catch( err => {
            console.log(err);})
    }


    //Post Method
    onNameHandler = (e) => {
        this.setState({name : e.target.value});
    }
    onJobHandler = (e) => {
        this.setState({job : e.target.value});
    }

    onSubmitHandler =(e) => {
        
        let user = {
            name : this.state.name,
            job : this.state.job
        }

        axios.post("https://reqres.in/api/users/",{user})
        .then( res => {
            console.log(res.data)
        })
        .catch( err => {
            console.log(err)
        })

        e.preventDefault();
    }


    //PUT method
    onPutIdHandler = (e) => {
        this.setState({put_id: e.target.value});
    } 
    onPutNameHandler = (e) => {
        this.setState({new_name : e.target.value});
    }
    onPutJobHandler = (e) => {
        this.setState({new_job : e.target.value});
    }

    onPutSubmitHandler =(e) => {
        
        let user = {
            name : this.state.new_name,
            job : this.state.new_job
        }

        axios.put("https://reqres.in/api/users/"+this.state.put_id,{user})
        .then( res => {
            console.log(res.data)
        })
        .catch( err => {
            console.log(err)
        })

        e.preventDefault();
    }


    //Delete method
    onDeleteIdHandler = (e) => {
        this.setState({delete_id: e.target.value});
    }

    onDeleteSubmitHandler =(e) => {

        axios.delete("https://reqres.in/api/users/"+this.state.delete_id)
        .then( res => {
            console.log(res)
        })
        .catch( err => {
            console.log(err)
        })

        e.preventDefault();
    }


    render() {
        return (
            <React.Fragment>
                <h2>Using Get Method</h2>
                <div className="home-container">
                    {this.state.datas.length > 0 && this.state.datas.map( data => (
                        <span  key={data.id}>
                            <img src={data.avatar} alt={data.first_name}/>
                            <p>Name : {data.first_name}</p>
                            <p>Email : {data.email}</p>
                        </span>
                    ))}
                </div>
                <h2>Using Post Method</h2>
                <div>
                    <form onSubmit={this.onSubmitHandler}>
                        Name: 
                        <input type="text" onChange={this.onNameHandler}/>
                        Job:
                        <input type="text" onChange={this.onJobHandler}/>
                        <button type="submit" >Submit</button>
                    </form>
                </div>
                <h2>Using Put Method</h2>
                <div>
                    <form onSubmit={this.onPutSubmitHandler}>
                        ID:
                        <input type="number" onChange={this.onPutIdHandler}/>
                        Name: 
                        <input type="text" onChange={this.onPutNameHandler}/>
                        Job:
                        <input type="text" onChange={this.onPutJobHandler}/>
                        <button type="submit" >Update</button>
                    </form>
                </div>
                <h2>Using Delete Method</h2>
                <div>
                    <form onSubmit={this.onDeleteSubmitHandler}>
                        ID:
                        <input type="number" onChange={this.onDeleteIdHandler}/>
                        <button type="submit" >Delete</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
