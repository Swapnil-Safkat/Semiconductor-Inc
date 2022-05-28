import { useEffect, useState } from "react";
import hostLink from "../Components/host";

const useTokens = (user) => {
  const [token, setToken] = useState('');
  useEffect(() => {
    const email = user?.user?.email;
    const currentUser = { email };
    if (email) {
      fetch(`${hostLink()}user`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
      }).then(res => res.json()).then(data => {
        localStorage.setItem('accessToken',data.token)
        setToken(data.token)
      })
    }
  }
    , [user, setToken])
  return [token];
};
export default useTokens;