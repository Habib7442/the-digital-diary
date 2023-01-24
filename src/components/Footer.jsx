import React from "react";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link to="/">
            <img src="../assets/logopng.png" alt="" />
          </Link>
          <span className="mb-3 mb-md-0 text-muted">
            © 2023 TheDigitalDiary
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a
              href="https://www.linkedin.com/in/habib-tanwir?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B5PZb43XKQ%2FeR%2BqdgymKamg%3D%3D"
              target="_blank"
              className="text-muted"
            >
              <LinkedInIcon />
            </a>
          </li>
          <li className="ms-3">
            <Link className="text-muted">
              <InstagramIcon />
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
