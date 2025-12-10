import type { Route } from "./+types/_index";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
    const defaultLocale = "en";
    return redirect(`/${defaultLocale}`);
}

export default function IndexRedirect() {
    return null;
}
