import React from 'react'
import { Button, Card,Spinner,Image} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useState, useEffect } from "react";

export const UserInfo = (props) => {
    
    const [availabe, setAvailable] = useState(false);
    const [userInfoWrapper, setUserInfoWrapper] = useState();
    let userInfo;
    


    const getUserInfo = async () => {
        const url = `https://api.github.com/users/${props.userName}`;
        await fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
              if(!data) return;
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

      useEffect(() => {
        if(!props.userName) return;
    
          getUserInfo().then(()=>{
              setAvailable(true);
          });
    },[] );

    return (
        <>
        {availabe? 
        (<div className="col-4 mt-2"><Card >
     <Card.Header style={{textAlign:"left"}}>
     <Image  src={userInfoWrapper.avatar_url} fluid />
     <strong>{userInfoWrapper.name}</strong>
     </Card.Header>
       <Card.Body>
          <div className="row mr-4 pr-4"><p className="pl-2">{userInfoWrapper.location}</p></div> 
          {userInfoWrapper.followers? (<div className="row mr-4 pr-4"><p className =" col-1 pl-2"><Icon.EmojiSmile /></p><p className ="col-5  pl-2"><strong>{userInfoWrapper.followers}</strong> followers</p>.<p className ="col-5  pl-2"><strong>{userInfoWrapper.following}</strong> following</p></div>):(<div></div>)} 
     {userInfoWrapper.email? (<div className="row mr-4 pr-4"><p className ="pl-2"><Icon.Envelope /></p><p className ="pl-4">{userInfoWrapper.email}</p></div>):(<div></div>) }
     {userInfoWrapper.bio? (<div className="row mr-4 pr-4"><p className ="pl-2 col-1"><Icon.Info /></p><p className ="pl-1 col-10">{userInfoWrapper.bio}</p></div>):(<div></div>)}
       
       </Card.Body>
   </Card></div>):(<div></div>)}
   {availabe && userInfoWrapper.length <= 0 ? 
(<div>No User</div>):(<div></div>)}
   </>
    )
}
