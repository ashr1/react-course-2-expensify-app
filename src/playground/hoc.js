// Higher Order Component (HOC) - A component (HOC) that renders another component

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info, please don't share.</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) =>  {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props}/>:<p>unauthenticated</p>}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="the top top secret is that there are no secrets." />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="the top top secret is that there are no secrets." />, document.getElementById('app'));