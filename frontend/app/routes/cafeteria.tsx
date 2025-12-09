import type { Route } from "./+types/cafeteria";
import { Link } from "react-router";

const pageTitle = "Cafeteria";

export function meta({}: Route.MetaArgs) {
    return [
        { title: `xtrek | ${pageTitle}` },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Cafeteria() {
    return (
        <>
            <h1>{pageTitle}</h1>
            <Link to={"/catering-services"}>Catering Services</Link>
        </>
    );
}
