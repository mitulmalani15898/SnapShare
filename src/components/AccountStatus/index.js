import { useContext, useEffect, useState } from "react";

import { AccountContext } from "../Account";

const AccountStatus = () => {
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      console.log("session", session);
      setStatus(true);
    });
  }, []);

  return (
    <div>
      {status ? <button onClick={logout}>Logout</button> : "Please Login"}
    </div>
  );
};

export default AccountStatus;
