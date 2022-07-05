import React from "react";
import "../index.css";
const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-content-left">
          <div>
            <p>
              Need Help?
              <span>
                <a href="#"> Contact US</a>
              </span>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-3 mx-auto">
            <i class="fab fa-facebook-f fontawesome-style"></i>
          </div>
          <div className="col-3 mx-auto">
            <i class="fab fa-instagram fontawesome-style"></i>
          </div>
          <div className="col-3 mx-auto">
            <i class="fab fa-youtube fontawesome-style"></i>
          </div>
          <div className="col-3 mx-auto">
            <i class="fab fa-twitter fontawesome-style"></i>
          </div>
        </div>
        <div className="footer-content-right">
          <p>Copyright2022.All Rights Reserved</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
