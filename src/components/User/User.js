import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const User = (props) => {
  const nav = useNavigate();
  const xsstest = "<alert>lô cc</alert>";
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      nav("/login");
    }
  }, []);
  return (
    <div>
      
      {xsstest}
    </div>
  );
};
export default User;
