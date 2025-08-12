import {useSelector} from "react-redux";

const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
const role = useSelector((state) => state.auth.role);

return (
    <form className="max-w-2xl mx-auto p-4 space-y-6">
        {isLoggedIn && (
            <div>Welcome {role}</div>
        )}

        {(!isLoggedIn) && (
            <div>Please login</div>
        )}
    </form>
)