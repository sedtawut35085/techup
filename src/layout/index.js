import React, {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './topbar.js';
import Auth from '../configuration/configuration-aws'

const AppLayout = () => {

  const [currentEmailUser, setCurrentEmailUser] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  useEffect( () => {
    checkAuthen();
  }, []);

  async function checkAuthen() {
    await Auth.currentAuthenticatedUser()
    .then(async(response) => {
      setCurrentEmailUser(response.attributes.email);
      if(response.attributes.email.includes('@mail.kmutt.ac.th')){
        setIsProfessor(false)
      }else{
        setIsProfessor(true)
      }
    })
    .catch(() => {
    }) 
  }
  
  return (
    <div>
        <TopBar currentEmailUser={currentEmailUser} isProfessor={isProfessor}/>
        <Outlet />
    </div>
  );
};

export default AppLayout;