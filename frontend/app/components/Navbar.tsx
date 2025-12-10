import { Link, NavLink } from "react-router";

const Navbar = ({ locale }: { locale: string }) => {
    return (
        <header>
            <nav>
                <NavLink to={`/${locale}/`}>
                    {locale === "fr" ? "Cafétéria" : "Cafeteria"}
                </NavLink>
                <NavLink to={`/${locale}/catering-services`}>
                    {locale === "fr"
                        ? "Service de traiteur"
                        : "Catering Services"}
                </NavLink>
                <NavLink to={"/en"}>English</NavLink> {" | "}
                <NavLink to={"/fr"}>Français</NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
