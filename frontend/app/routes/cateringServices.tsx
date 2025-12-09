import type { Route } from "./+types/cafeteria";
import { Link } from "react-router";

const pageTitle = "Catering Services";

export function meta({}: Route.MetaArgs) {
    return [
        { title: `xtrek | ${pageTitle}` },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function cateringServices() {
    return (
        <>
            <h1>{pageTitle}</h1>
            <Link to={"/"}>Cafeteria</Link>
        </>
    );
}
