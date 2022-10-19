import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./notFound.css";

function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    let timeOut = setTimeout(() => {
      navigate("/admin/post");
    },4000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return <div className="notFound"></div>;
}

NotFound.propTypes = {};

export default NotFound;
