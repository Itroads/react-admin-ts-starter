import * as React from 'react'
import { Route, Redirect } from 'react-router-dom';

interface IWrap {
  path: string;
  component: any;
}

const PrivateRoute = ({ component: Component, ...rest }: IWrap): any => {
  const AuthFuc = (props: any) => {
    const empBasic = window.sessionStorage.getItem('empBasic')
    return empBasic !== '' && empBasic !== undefined && empBasic !== null
      ? <Component {...props} />
      : <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location }
        }}
      />
  }

  return <Route {...rest} render={AuthFuc} />
}

export default PrivateRoute