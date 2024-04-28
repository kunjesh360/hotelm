import Template from "../Components/Template";
import loginImg from "../assets/login.png";

function Login({ setIsLoggedIn }) {
  return (
    <Template
      title="Welcome Back"
      description1="The intimate yachts of The Ritz-Carlton Yacht Collection fuse the residential feel and legendary service of The Ritz-Carlton with untethered freedom."
      // description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default Login;
