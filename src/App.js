import * as React from "react";
import { fetchUtils, Admin, Resource, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import simpleRestProvider from 'ra-data-simple-rest';
import { UserList } from './layout/dashboardContent/Users';
import { PostList, PostEdit, PostCreate } from './layout/dashboardContent/Posts';
import { PostssList, PostssEdit, PostssCreate } from './layout/dashboardContent/Postss';
import { ValtypeList, ValtypeEdit, ValtypeCreate } from './layout/dashboardContent/Valtypes';
import { AssettypeList, AssettypeEdit, AssettypeCreate } from './layout/dashboardContent/Assettypes';
import Dashboard from "./layout/Dashboard";
import CustomLoginPage from './CustomLoginPage';
import { firebaseConfig } from "./FIREBASE_CONFIG";

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import {
  // FirebaseDataProvider,
  FirebaseAuthProvider,
} from 'react-admin-firebase';

import firebase from "firebase/compat/app";
// require('dotenv').config()
// let firebaseConfig;
// try {
//   firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
// } catch (error) {
//   console.error('Error parsing (maybe quotes aren\'t escaped?): ', {REACT_APP_FIREBASE_CONFIG: process.env.REACT_APP_FIREBASE_CONFIG}, error);
// }

const firebaseApp = firebase.initializeApp(firebaseConfig);

console.log({firebaseConfig, firebaseApp});

const authProvider = FirebaseAuthProvider(firebaseConfig);

const myAuthProvider = {
  // Copy all authprovider functionality
  ...authProvider,
  // Wrap the checkAuth to add page redirection
  checkAuth: () =>
    authProvider
      .checkAuth()
      .then(() => {
        // Successfully logged in
        return { redirectTo: "/#" };
        // console.log('success-login');
      })
      .catch(() => {
        // Auth error
        return { redirectTo: "/login" };
        // console.log('failed-login');
      }),
};

const fetchJson = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  // add your own headers here
  options.headers.set('X-Custom-Header', 'foobar');
  return fetchUtils.fetchJson(url, options);
}

const dataProvider = simpleRestProvider('http://localhost:5000',fetchJson);
function App() {
  return (
    <Admin
      title=""
      dashboard={Dashboard}
      loginPage={CustomLoginPage}
      dataProvider={dataProvider}
      authProvider={authProvider}
      disableTelemetry
    >
      <Resource name="products" list={PostssList} edit={PostssEdit} create={PostssCreate} icon={PostIcon} />
      <Resource name="valtypes" list={ValtypeList} edit={ValtypeEdit} create={ValtypeCreate} icon={UserIcon} />
      <Resource name="assettypes" list={AssettypeList} edit={AssettypeEdit} create={AssettypeCreate} icon={PostIcon} />
      {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
    </Admin>
    
  );
}

export default App;
