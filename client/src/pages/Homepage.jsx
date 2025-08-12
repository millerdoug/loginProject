import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function Homepage() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary-dark p-6">
            {isLoggedIn ? (
                <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full text-center">
                    <h1 className="text-3xl font-bold text-primary mb-4">
                        Welcome, <span className="capitalize">{role}</span>!
                    </h1>
                    <p className="text-gray-700">
                        Glad to see you back. Explore your dashboard or check out your tasks.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        You are not logged in.
                    </h2>
                    <Link
                        to="/login"
                        className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark transition font-medium"
                    >
                        Login Here
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Homepage;
