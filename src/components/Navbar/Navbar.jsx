import React from "react";
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.css'

function Navbar() {
  return (
    <div className="position-fixed z-1000 w-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="col-2 text-center">
          <a className="navbar-brand brand-name" href="/">QYZYQ</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        

        <div className="collapse navbar-collapse col-6" id="navbarSupportedContent">
          <ul className="navbar-nav">
              <li className="nav-item active px-5 center">
                <a className="nav-link" href="/">
                  <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="32" height="32"><path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z"/></svg>
                  <span className="sr-only"> </span>
                  Home 
                </a>
                
              </li>
            
              <li className="nav-item px-5 center">                
                <a className="nav-link" href="/movie">
                  <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="32" height="32"><path d="M20.494,7.968l-9.54-7A5,5,0,0,0,3,5V19a5,5,0,0,0,7.957,4.031l9.54-7a5,5,0,0,0,0-8.064Zm-1.184,6.45-9.54,7A3,3,0,0,1,5,19V5A2.948,2.948,0,0,1,6.641,2.328,3.018,3.018,0,0,1,8.006,2a2.97,2.97,0,0,1,1.764.589l9.54,7a3,3,0,0,1,0,4.836Z"/></svg>
                  Watch
                </a>
              </li>
            
              <li className="nav-item px-5 center">                
                <a className="nav-link" href="/music">
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="32" height="32"><path d="M22.554.923A3.978,3.978,0,0,0,19.263.07L10.079,1.792A5,5,0,0,0,6,6.706v9.85A3.959,3.959,0,0,0,4,16a4,4,0,1,0,4,4V10.876A2,2,0,0,1,9.632,8.91l11.183-2.1A1,1,0,0,1,22,7.8v5.76A3.959,3.959,0,0,0,20,13a4,4,0,1,0,4,4V4A3.987,3.987,0,0,0,22.554.923ZM4,22a2,2,0,1,1,2-2A2,2,0,0,1,4,22ZM20.447,4.848,9.263,6.944A4,4,0,0,0,8,7.416v-.71a3,3,0,0,1,2.447-2.949l9.185-1.722A2,2,0,0,1,22,4v.984A2.955,2.955,0,0,0,20.447,4.848ZM20,19a2,2,0,1,1,2-2A2,2,0,0,1,20,19Z"/></svg>                
                  Listen
                </a>
              </li>
            
              <li className="nav-item px-5 center">              
                <a className="nav-link" href="/book">
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="32" height="32"><path d="M22.2,2.163a4.992,4.992,0,0,0-4.1-1.081l-3.822.694A4,4,0,0,0,12,3.065,4,4,0,0,0,9.716,1.776L5.9,1.082A5,5,0,0,0,0,6V16.793a5,5,0,0,0,4.105,4.919l6.286,1.143a9,9,0,0,0,3.218,0L19.9,21.712A5,5,0,0,0,24,16.793V6A4.983,4.983,0,0,0,22.2,2.163ZM11,20.928c-.084-.012-.168-.026-.252-.041L4.463,19.745A3,3,0,0,1,2,16.793V6A3,3,0,0,1,5,3a3.081,3.081,0,0,1,.54.049l3.82.7A2,2,0,0,1,11,5.712Zm11-4.135a3,3,0,0,1-2.463,2.952l-6.285,1.142c-.084.015-.168.029-.252.041V5.712a2,2,0,0,1,1.642-1.968l3.821-.7A3,3,0,0,1,22,6Z"/></svg>
                  Read
                </a>
              </li>
								 
							</ul>
						</div>

            <div className="col-4"></div>
					</nav>
    </div>
  );
}

export default Navbar;