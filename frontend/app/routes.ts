import {
    type RouteConfig,
    index,
    route,
} from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),

    route(":locale", "routes/$locale._layout.tsx", [
        index("routes/$locale.cafeteria.tsx"),
        route(
            "catering-services",
            "routes/$locale.cateringServices.tsx"
        ),
    ]),
] satisfies RouteConfig;
