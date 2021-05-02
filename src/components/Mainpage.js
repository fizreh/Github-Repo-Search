import React from 'react';
import { useState, useEffect } from "react";
import { Button, Card,Spinner,Image} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { RepoInfo } from './RepoInfo';
import { UserInfo } from './UserInfo';

export const Mainpage = () => {
    const [userName, setUserName] = useState("");
    const [clicked, setClicked] = useState(false);
    const [availabe, setAvailable] = useState(false);


    const searchClicked = ()=>{
        console.log("User Name: ",userName);
        if(!userName) return;
        setClicked(true);   
    }

         
    useEffect(() => {
          setClicked(false);
    },[] );

      
return (
        <div className="container-fluid">
           <div className="pb-4"> 
           <h2>Welcome to Git-Hub Repository search</h2> 
           <div className = "row justify-content-center pt-4 pb-4">
               <div className = "col-2"><label>Enter Username</label></div>
               <div className = "col-2"><input name="userName" placeholder="123" value={userName} onChange={(e) => setUserName(e.target.value)}></input></div>
            {clicked && !userName ? (<label color = "red">Please Enter Username</label>): (<div></div>)}
            </div>
            <Button onClick ={searchClicked}>Search Repo</Button>
            </div>
     
     {clicked? (<div className="row">
    <UserInfo userName={userName}></UserInfo>
   <RepoInfo userName={userName}></RepoInfo></div> ):
         (<div><Spinner ></Spinner></div>)}
 
   
         
           
           
           
        </div>
    )
}

export default Mainpage;
