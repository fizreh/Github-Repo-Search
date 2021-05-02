import React from 'react';
import { useState, useEffect } from "react";
import { Button, Card,Spinner,Image} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export const Mainpage = () => {
    const [userName, setUserName] = useState("");
    const [clicked, setClicked] = useState(false);
    const [availabe, setAvailable] = useState(false);
    const [repoInfoWrapper, setRepoInfoWrapper] = useState([]);
    const [userInfoWrapper, setUserInfoWrapper] = useState();
    let userInfo;
    let repoInfo;
    let repoInfo2;



    const searchClicked = async ()=>{
        console.log("User Name: ",userName);
        if(!userName) return;
        setClicked(true);
        await getRepo().then(()=>{
            setAvailable(true);
        });
        
        
    

      

    
        
    }

    


    const getUserInfo = async () => {
        const url = `https://api.github.com/users/${userName}`;
        await fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            userInfo = data;
           // console.log("USerInfo:",userInfo);
           /* userInfo = data.map(function(item) {
                return {
                  name: item.name,
                  loginName: item.login,
                  location: item.location,
                  url:item.url
                };
                
              });*/
              console.log("USerInfo:",userInfo);
           
            
          })
          .catch((error) => console.log("Updation failed : " + error.message));


          setUserInfoWrapper(userInfo);
        

      };

    const getRepo = async () => {
      await getUserInfo();
        const url = `https://api.github.com/users/${userName}/repos`;
        await fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            //repoInfo = data;
            //console.log("RepoInfo 2",repoInfo2);
            repoInfo = data.map(function(item) {
                return {
                  name: item.name,
                  loginName: item.owner.login,
                  language: item.language,
                  forks_count: item.forks_count,
                  stargazers_count : item.stargazers_count
                };
              });
            
           
            
          })
          .catch((error) => console.log("Updation failed : " + error.message));


          setRepoInfoWrapper(repoInfo);

      };

     
      

      useEffect(() => {
          if(!userName) return;
          if(clicked)
          { 
            getUserInfo();
            getRepo();
        }
      },[] );

      if(availabe)
    {
    console.log("RepoInfo: ",repoInfo);
    console.log("RepoInfoWrapper: ",repoInfoWrapper);
    console.log("userInfo: ",userInfo);
    console.log("userInfoWrapper: ",userInfoWrapper);
}




     let  repositories = repoInfoWrapper.map(repo =>(
         <div className = "m-2">
    
        <Card style = {{width : '840px'}}>
          <Card.Header style={{textAlign:"left"}}>
          <strong>{repo.name}</strong>
        
          </Card.Header>
            <Card.Body className="row">
              
                <div className=" ml-2 row mr-4 pr-4"><Icon.Code className="mt-1" /><p className="pl-1">{repo.language}</p></div>
               <div className="row mr-4 pr-4"><Icon.Star className="mt-1" /><p className="pl-1">{repo.stargazers_count}</p></div> 
               <div className="row mr-4 pr-4"><Icon.Diagram2 className="mt-1" /><p className ="pl-1">{repo.forks_count}</p></div> 
               
               
                
                

            
            </Card.Body>
        </Card>
    
      </div>
    ))
      



    return (
        <div className="container">
           <div className="pb-4"> 
           <h2>Welcome to Git-Hub Repository search</h2> 
           <div className = "row justify-content-center pt-4 pb-4">
               <div className = "col-2"><label>Enter Username</label></div>
               <div className = "col-2"><input name="userName" placeholder="123" value={userName} onChange={(e) => setUserName(e.target.value)}></input></div>
            {clicked && !userName ? (<label color = "red">Please Enter Username</label>): (<div></div>)}
            </div>
            <Button onClick ={searchClicked}>Search Repo</Button>
            </div>
     
     {clicked? 
     (availabe && repositories.length > 0 ? 
     (<div className="row"><div className="col-4 mt-2"><Card >
     <Card.Header style={{textAlign:"left"}}>
     <Image style ={{width:"290px", height:"200px"}} src={userInfoWrapper.avatar_url} rounded />
     <strong>{userInfoWrapper.name}</strong>
     </Card.Header>
       <Card.Body>
          <div className="row mr-4 pr-4"><p className="pl-4">{userInfoWrapper.location}</p></div> 
          <div className="row mr-4 pr-4"><p className ="pl-4">{userInfoWrapper.url}</p></div> 
          <div className="row mr-4 pr-4"><p className ="pl-4"><Icon.MenuApp />{userInfoWrapper.followers}</p></div> 
          <div className="row mr-4 pr-4"><p className ="pl-4"><Icon.Envelope />{userInfoWrapper.email}</p></div> 
          <div className="row mr-4 pr-4"><p className ="pl-4"><Icon.Info />{userInfoWrapper.bio}</p></div>
       
       </Card.Body>
   </Card></div><div className = " col-8 row">{repositories} </div></div>):
        
        (<div><Spinner ></Spinner></div>))
     
     :(<div></div>)}
     {availabe && repositories.length <= 0 ? 
(<div>Repo not found</div>):(<div></div>)}
   
         
           
           
           
        </div>
    )
}

export default Mainpage;
