import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState(``);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(``);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder="username" />
        <input required type="email" placeholder="email" ref={emailRef} />
        <input
          required
          type="password"
          placeholder="password"
          ref={passwordRef}
        />
        {/* <input
          required
          type="file"
          placeholder="password"
        /> */}
        <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>
          Have account ? <br />
          <Link className="link" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
