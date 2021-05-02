import React from 'react';
import { useState, useEffect } from "react";
import { Button, Card,Spinner,Image} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export const RepoInfo = (props) => {
    const [availabe, setAvailable] = useState(false);
    const [repoInfoWrapper, setRepoInfoWrapper] = useState([]);
    let repoInfo;
    let repoInfo2;

    
    const getRepo = async () => {
        
          const url = `https://api.github.com/users/${props.userName}/repos`;
          await fetch(url)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              repoInfo = data;
              //console.log("RepoInfo 2",repoInfo2);
              if(!data) return;
             /*  repoInfo = data.map(function(item) {
                  return {
                    name: item.name,
                    loginName: item.owner.login,
                    language: item.language,
                    forks_count: item.forks_count,
                    stargazers_count : item.stargazers_count
                  };
                }); */
              
             
              
            })
            .catch((error) => console.log("Updation failed : " + error.message));
  
  
            setRepoInfoWrapper(repoInfo);
  
        };
        useEffect(() => {
            if(!props.userName) return;
        
              getRepo().then(()=>{
                  setAvailable(true);
              });
        },[] );
  
        if(availabe)
      {
      console.log("RepoInfo: ",repoInfo);
      console.log("RepoInfoWrapper: ",repoInfoWrapper);
     
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
              <div className="row mr-4 pr-4"><p className ="pl-1">Last updated on {repo.updated_at }</p></div>   
           </Card.Body>
       </Card>
   
     </div>
   ))


    return (
    <>
            {availabe || repositories.length > 0 ? 
     (<div className = " col-8 row">{repositories} </div>):
        
        (<div><Spinner ></Spinner></div>)}
            {availabe && repositories.length <= 0 ? 
(<div>No Repositories</div>):(<div></div>)}
     </>
            
    
    )
}
