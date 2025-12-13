// React Router
import { redirect } from "react-router";

// Types
import type { Route } from "./+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
    const defaultLocale = "en";
    return redirect(`/${defaultLocale}`);
}

export default function IndexRedirect() {
    return null;
}
