import * as React from "react";
import { fetchUtils, Admin, Resource, EditGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { ValtypeList, ValtypeEdit, ValtypeCreate } from './layout/dashboardContent/Valtypes';
import { AssettypeList, AssettypeEdit, AssettypeCreate } from './layout/dashboardContent/Assettypes';
import { DepartmentList, DepartmentEdit, DepartmentCreate } from './layout/dashboardContent/Departments';
import { LokasiList, LokasiEdit, LokasiCreate } from './layout/dashboardContent/Lokasis';
import { RoleList, RoleEdit, RoleCreate } from './layout/dashboardContent/Roles';
import { UserList, UserEdit, UserCreate } from './layout/dashboardContent/Users';
import { BarangList, BarangEdit, BarangCreate } from './layout/dashboardContent/Barangs';
import Dashboard from "./layout/Dashboard";
import CustomLoginPage from './CustomLoginPage';
import { firebaseConfig } from "./FIREBASE_CONFIG";

import PostIcon from '@material-ui/icons/Book';
import DepartmentIcon from '@material-ui/icons/BusinessRounded';
import UserIcon from '@material-ui/icons/Group';
import LokasiIcon from '@material-ui/icons/LocationOn';
import RoleIcon from '@material-ui/icons/DynamicFeed';
import BarangIcon from '@material-ui/icons/Category';

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
      <Resource name="valtypes" list={ValtypeList} edit={ValtypeEdit} create={ValtypeCreate} icon={UserIcon} />
      <Resource name="assettypes" list={AssettypeList} edit={AssettypeEdit} create={AssettypeCreate} icon={PostIcon} />
      <Resource name="lokasis" options={{ label: 'Lokasi' }} list={LokasiList} edit={LokasiEdit} create={LokasiCreate} icon={LokasiIcon} />
      <Resource name="departments" list={DepartmentList} edit={DepartmentEdit} create={DepartmentCreate} icon={DepartmentIcon} />
      <Resource name="roles"  list={RoleList} edit={RoleEdit} create={RoleCreate} icon={RoleIcon} />
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} />
      <Resource name="barangs" list={BarangList} edit={BarangEdit} create={BarangCreate} icon={BarangIcon} />
    </Admin>
    
  );
}

export default App;
