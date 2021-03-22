import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { Button, Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../Header/Header';
import firebaseConfig from '../../firebaseConfig';



const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,

  })

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    }).then(function() {
    
    }).catch(function(error) {
      console.log(error)
    });
  }


  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }


  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      if(isFieldValid === false){
        alert('please enter valid eamil')
      }
    }
    if (e.target.name === 'password') {
      isFieldValid = e.target.value.length > 6 && /\d{1}/.test(e.target.value);
      if(isFieldValid === false){
        alert('password must contain 6 leatters and numbers')
      }
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {

      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          var user = userCredential.user;
          updateUserName(user.name);

        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          console.log(res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    e.preventDefault()
  }

  const handleFacebook = () => {
    var fbprovider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(fbprovider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        const { displayName } = result.user;
        const signedInUser = { name: displayName }
        setLoggedInUser(signedInUser);

        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }

  const handleGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        const { displayName } = result.user;
        const signedInUser = { name: displayName }
        setLoggedInUser(signedInUser);
        history.replace(from);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }



  return (
    <div className='container my-5 bg-light p-5'>
      <p> {user.error} <br />
        {user.success && <p>successful</p>}
      </p>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          {newUser && <Form.Control name='name' type="text" placeholder="Enter name" required />}
          <Form.Label>Email address</Form.Label>
          <Form.Control name='email' onBlur={handleBlur} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
    </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' onBlur={handleBlur} type="password" placeholder="Password" required />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button onClick={handleSubmit} variant="primary" type="submit">
          {newUser ? 'Sign up' : 'log in'}
        </Button>
        <div>
          {!newUser ?
            <p >Dont have an account? <a style={{ color: 'blue' }} onClick={() => setNewUser(!newUser)}>Sign up</a> </p>
            : <p>already have an account? <a style={{ color: 'blue' }} onClick={() => setNewUser(!newUser)}>Sign in</a> </p>
          }
        </div>
      </Form>

      <Button onClick={handleFacebook} variant="primary" size="lg" block>
        Continue with Facebook
      </Button>
      <Button onClick={handleGoogle} variant="secondary" size="lg" block>
        Continue with Google
      </Button>
      <p className='text-center text-danger'>there is some bug in email sigin. please use google or facebook</p>
    </div>
  );
};

export default Login;