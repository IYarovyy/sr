import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthState } from "@contexts/context";
import { paths } from "routes"

export const PrivateRoute: React.FC<RouteProps> = props => {
    const userDetails = useAuthState();
    let redirectPath = '';
    if (!Boolean(userDetails.access_token)) {
        redirectPath = paths.auth;
    }
    if (redirectPath) {
        // const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
        // return <Route {...props} component={renderComponent} render={undefined} />;
        return <Redirect to={{ pathname: redirectPath }} />;
    } else {
        return <Route {...props} />;
    }
};

export default PrivateRoute;