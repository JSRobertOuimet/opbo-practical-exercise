import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
    const defaultLocale = "en";
    return redirect(`/${defaultLocale}`);
}

export default function IndexRedirect() {
    return null;
}
