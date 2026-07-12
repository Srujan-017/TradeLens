import { useState } from "react";
import axios from "axios";

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
    e.preventDefault();

    try {
        await axios.post(
            "https://tradelens-ewjp.onrender.com/signup",
            {
                username,
                email,
                password,
            }
        );

        setUsername("");
        setEmail("");
        setPassword("");

        window.location.href = "/login";

    } catch (err) {
        alert(err.response?.data?.message || "Something went wrong");
    }
};

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-5">

                    <h2 className="mb-4 text-center">
                        Create TradeLens Account
                    </h2>

                   <form onSubmit={handleSignup}>

                        <div className="mb-3">

                            <label className="form-label">
                                Username
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Signup
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Signup;