// React Router
import { redirect } from "react-router";

// Internationalization
import { detectLocaleFromHeader } from "~/utils/i18n";

// Types
import type { Route } from "./+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
    const acceptLanguage = request.headers.get("Accept-Language");
    const defaultLocale = detectLocaleFromHeader(acceptLanguage);
    return redirect(`/${defaultLocale}`);
}

export default function IndexRedirect() {
    return null;
}
