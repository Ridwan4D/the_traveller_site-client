/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPublic = useAxiosPublic();


  // register user with email pass
  const registerUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth,email,password);
  };

  // register user with google and github
  const singUpWithApp = (provider) => {
    setIsLoading(true);
    return signInWithPopup(auth, provider);
  };

  const loginUser = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const profileUpdate = (name, image) => {
    setIsLoading(true);
    return updateProfile(user, {
      displayName: name ? name : user.displayName,
      photoURL: image ? image : user.photoURL,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("logged from :", currentUser);
      setUser(currentUser);
      if(currentUser){
        const userInfo = {email:currentUser.email}
        axiosPublic.post('/jwt',userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem('access-token',res.data.token)
          }
        })
      }else{
        localStorage.removeItem('access-token')
      }
      setIsLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  // logout
  const logout = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  const provideInfo = {
    user,
    isLoading,
    registerUser,
    singUpWithApp,
    loginUser,
    profileUpdate,
    logout,
  };
  return (
    <AuthContext.Provider value={provideInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
