import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
return (
  <>
  <hr style={{color: "white"}}></hr>
    <footer className="footer"> 
      <p>&copy; {currentYear} || website offered by Jacopo Pierantozzi</p>
    </footer>
  </>
);
}

export default Footer;
