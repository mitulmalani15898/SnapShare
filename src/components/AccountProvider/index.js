import Cookies from "js-cookie";
import { createContext, useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

import Pool from "../../utility/UserPool";

const AccountContext = createContext();

const cookieMeta = {
  path: "",
};

const AccountProvider = (props) => {
  useEffect(() => {}, []);

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject();
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes(function (err, attributes) {
                if (err) {
                  reject(err);
                } else {
                  const results = {};
                  attributes.forEach(
                    ({ Name, Value }) => (results[Name] = Value)
                  );
                  resolve(results);
                }
              });
            });
            resolve({ user, ...session, ...attributes });
          }
        });
      } else {
        reject();
      }
    });
  };

  const getCognitoUser = (Username) => {
    const user = new CognitoUser({ Username, Pool });
    return user;
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = getCognitoUser(Username);

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          Cookies.set("accessToken", data.accessToken.jwtToken, cookieMeta);
          Cookies.set("idToken", data.idToken.jwtToken, cookieMeta);
          Cookies.set("refreshToken", data.refreshToken.token, cookieMeta);
          resolve(data);
        },
        onFailure: (err) => {
          console.log("onFailure", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      removeCookies();
      user.signOut();
    }
  };

  const removeCookies = () => {
    Cookies.remove("accessToken", cookieMeta);
    Cookies.remove("idToken", cookieMeta);
    Cookies.remove("refreshToken", cookieMeta);
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        removeCookies,
        getCognitoUser,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { AccountProvider, AccountContext };
