import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default ({component: Component, redirectPath, ...rest}) => {
    
    const { authenticated } = useSelector(store=> store.authReducer );

    return (
      <Route
        {...rest}
        render={(props) => authenticated === true
          ? <Component {...props} />
          : <Redirect to={{pathname: `${redirectPath}`, state: {from: props.location}}} />}
      />
    )
};