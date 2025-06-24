import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* Information */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-uppercase fw-bold">Information</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="#" className="text-white text-decoration-none">Pages</a></li>
              <li><a href="#" className="text-white text-decoration-none">Our Team</a></li>
              <li><a href="#" className="text-white text-decoration-none">Features</a></li>
              <li><a href="#" className="text-white text-decoration-none">Pricing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-uppercase fw-bold">Resources</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="#" className="text-white text-decoration-none">Wikipedia</a></li>
              <li><a href="#" className="text-white text-decoration-none">React Blog</a></li>
              <li><a href="#" className="text-white text-decoration-none">Terms & Service</a></li>
              <li><a href="#" className="text-white text-decoration-none">Angular Dev</a></li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-uppercase fw-bold">Help</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="#" className="text-white text-decoration-none">Sign Up</a></li>
              <li><a href="#" className="text-white text-decoration-none">Login</a></li>
              <li><a href="#" className="text-white text-decoration-none">Terms of Service</a></li>
              <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h6 className="text-uppercase fw-bold">Contact Us</h6>
            <p className="mt-3 mb-1">Contact us if you need help with anything</p>
            <p className="mb-0">📞 +91 9999999999</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="mb-0 small text-secondary">
          © 2019 VNR. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
