import Cookies from "js-cookie";
import axios from "axios";
import { createContext, useEffect } from "react";
import { S3Client } from "@aws-sdk/client-s3";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const AccountContext = createContext();

const REGION = "us-east-1";
const cookieMeta = {
  path: "",
};

let secrets = {};

const AccountProvider = (props) => {
  useEffect(() => {
    getAwsCredentials();
  }, []);

  const getAwsCredentials = async () => {
    const res = await axios.get(
      "https://wszv10gk5c.execute-api.us-east-1.amazonaws.com/get-credentials"
    );
    if (res.status === 200) {
      secrets = res.data.secrets;
    }
  };

  const getS3Client = () => {
    const s3Client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: secrets.AWS_ACCESS_KEY_ID,
        secretAccessKey: secrets.AWS_SECRET_ACCESS_KEY,
      },
    });
    return s3Client;
  };

  const getUserPool = () => {
    const poolData = {
      UserPoolId: secrets.USER_POOL_ID,
      ClientId: secrets.USER_POOL_CLIENT_ID,
    };
    const userPool = new CognitoUserPool(poolData);
    return userPool;
  };

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const Pool = getUserPool();
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
    const Pool = getUserPool();
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
    const Pool = getUserPool();
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
        getUserPool,
        getS3Client,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { AccountProvider, AccountContext, secrets };
