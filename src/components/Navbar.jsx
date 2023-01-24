import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import svg from "../assets/logopng.png";
import { Paper, Stack } from "@mui/material";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <Stack>
      <h6 style={{ background: "teal", color: "white", textAlign: "center" }}>
        To write a new blog please{" "}
        <Link className="link" to="/login" style={{ color: "orange" }}>
          Login
        </Link>{" "}
      </h6>
      <div className="navbar">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid links">
              <div className="logo">
                <Link className="link" to="/">
                  <img src={svg} alt="" />
                </Link>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ backgroundColor: "white" }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="me-auto mb-2 mb-lg-0 links">
                  <Link className="link" to="/new?cat=coding">
                    <Paper>
                      <h6 style={{ padding: "3px" }}>CODING</h6>
                    </Paper>
                  </Link>
                  <Link className="link" to="/new?cat=art">
                    <Paper>
                      <h6 style={{ padding: "3px" }}>ART</h6>
                    </Paper>
                  </Link>
                  <Link className="link" to="/new?cat=movie">
                    <Paper>
                      <h6 style={{ padding: "3px" }}>MOVIE</h6>
                    </Paper>
                  </Link>
                  <Link className="link" to="/new?cat=sports">
                    <Paper>
                      <h6 style={{ padding: "3px" }}>SPORTS</h6>
                    </Paper>
                  </Link>
                  <Link className="link" to="/new?cat=food">
                    <Paper>
                      <h6 style={{ padding: "3px" }}>FOOD</h6>
                    </Paper>
                  </Link>
                  <Link className="link" to="/new?cat=technology">
                    <Paper>
                      <h6 style={{ padding: "3px" }}>TECHNOLOGY</h6>
                    </Paper>
                  </Link>
                  <Link className="link" to="/new?cat=business">
                    <Paper>
                      <h6 style={{ padding: "3px" }}>BUSINESS</h6>
                    </Paper>
                  </Link>
                  <span>
                    <h6>{currentUser?.email}</h6>
                  </span>
                  <span>
                    {currentUser ? (
                      <h6 onClick={logout}>Logout</h6>
                    ) : (
                      <Link className="link" to="/login">
                        <h6>Login</h6>
                      </Link>
                    )}
                  </span>
                  {currentUser && (
                    <span className="write">
                      <Link className="link" to="/write">
                        Write
                      </Link>
                    </span>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </Stack>
  );
};

export default Navbar;
