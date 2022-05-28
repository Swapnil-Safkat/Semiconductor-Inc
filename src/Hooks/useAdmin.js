import { useEffect, useState } from "react";
import hostLink from "../Components/host";

const useAdmin = user=>{
  const [admin, setAdmin] = useState();
  const [adminLoading,setAdminLoading] = useState(true);
  useEffect(() => {
    const email = user?.email;
    fetch(`${hostLink()}admin/${email}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization:`Bearer ${localStorage.getItem('accessToken')}`
      },
    }).then(res => res.json())
      .then(data => {
        setAdmin(data.isAdmin);
        setAdminLoading(false)
    })
  }
  ,[user])
return [admin,adminLoading];
};
export default useAdmin;
