import { Link } from "@remix-run/react";

export default function Dashboard() {
    return (
        <>
            <p>Dashboard</p>
            <Link to="/logout">
                <button>Logout</button>
            </Link>
        </>

    );
}