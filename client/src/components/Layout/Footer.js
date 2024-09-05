import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <style jsx>
        {`
        @media(max-width : 810px){
        .footer{
        margin-top : 50px;}}
        @media (max-width: 768px){
        .footer{
        margin-top: 380px;}
        }
        @media (max-width : 600px){
        .footer{
        margin-top : 300px;
        }
        }
        @media(max-width : 500px){
        .footer{
        margin-top : 200px;
         }}

        `}
        
      </style>
      <style jsx>
          {`
          @media(max-width:500px){
          .footer{
          margin-top : 300px;
          }
          }
          `}
        </style>
      <h1 className="text-center">All Right Reserved &copy; PardeepWeb</h1>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
