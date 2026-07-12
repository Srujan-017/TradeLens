import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        axios
            .get(
                "https://tradelens-ewjp.onrender.com/currentUser",
                {
                    withCredentials: true,
                }
            )
            .then((res) => {

                if (res.data.success) {

                    setAuthenticated(true);

                } else {

                    window.location.href = "https://tradelens-1.onrender.com/login";

                }

                setLoading(false);

            })
            .catch(() => {

                window.location.href = "https://tradelens-1.onrender.com/login";

            });

    }, []);

    if (loading) {

        return <h3>Loading...</h3>;

    }

    return authenticated ? children : null;

};

export default ProtectedRoute;