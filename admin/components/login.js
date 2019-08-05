import React, { Component } from 'react'
import { Button } from 'antd';


class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "404 Not Found",
            password: "sorry about it"
        }
    }
    
    handleChange (e)  {
       this.setState({username: e.target.value})
    // console.log(e.target.value);
    }
    handleForm(){

    }
    
    render() {
        const style = {
            username : {
                padding : '12px 0',
                border : 0,
                width : '100%',
                textAlign : 'center',
                fontSize : 35,
                fontFamily : 'Noto Sans'
            },
            password : {
                padding : '12px 0',
                border : 0,
                width : '100%',
                textAlign : 'center',
                fontSize : 25,
                fontFamily : 'Noto Sans'
            },
        }

        const {username, password} = this.state

        return (
            <div>
            <input
                style={style.username}
                type={'text'}
                value={username}
                placeholder={''}
                onChange={(e)=>{this.handleChange(e)}}
            />
            <br />
             <input
                style={style.password}
                type={'password'}
                placeholder={password}
                // onChange={(e)=>{this.handleChange(e)}}
            />
            <hr />
            <center>
                <Button type="danger" onClick={this.handleForm}>
                    Back to Google.com
                </Button>
            </center>
            </div>
        )
    }
}

export { Login };