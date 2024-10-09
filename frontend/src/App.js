import { useEffect,useState } from 'react';
import './App.css';

const Github_Client_id="Ov23li3lRmfpIGkKscLK";
const Github_redirect_uri="http://localhost:3000";
const path="/";



function App() {

  const [render,setRender]=useState(false);
  // const [userData,setUserData]=useState({});

  useEffect(() => {
    const queryString=window.location.search;
    const urlParams=new URLSearchParams(queryString);
    const codeParam=urlParams.get('code');
    console.log(codeParam);

    if(codeParam && localStorage.getItem('access_token')===null){
      async function getAccessToken(){
        await fetch(`http://localhost:3005/api/v1/getAccessToken?code=${codeParam}`,{
          method:"GET",
        }).then((res)=>res.json())
          .then((data)=>{
            console.log(data);
            if(data.data.access_token){
              setRender(!render);
              localStorage.setItem('access_token',data.data.access_token);
            }
            
          })
      }
      getAccessToken();
    } 

  },[])

  // async function getUserData(){
  //   await fetch(`http://localhost:3005/api/v1/getUserDetails`,{
  //     method:"GET",
  //     headers:{
  //       "Authorization":"Bearer "+localStorage.getItem('access_token')
  //     }
  // }).then((response)=>{
  //   return response.json();
  // }).then((data)=>{
  //   console.log(data);
  //   setUserData(data);
  // })
  // }


  function loginWithGithub(){
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${Github_Client_id}&redirect_uri=${Github_redirect_uri}&path=${path}&scope=repo,repo:status,write:discussion`)
  }

  return (
    <div className="App">
        <button onClick={loginWithGithub}>Connect with Github</button>
    </div>
  );
}

export default App;
