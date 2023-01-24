import { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(``);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="email"
          placeholder="email"
          ref={emailRef}
        />
        <input
          required
          type="password"
          placeholder="password"
          ref={passwordRef}
        />
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>
          Dont have account ? <br />
          <Link className="link" to="/register">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
