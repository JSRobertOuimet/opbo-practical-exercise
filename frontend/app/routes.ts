import {
    type RouteConfig,
    index,
    route,
} from "@react-router/dev/routes";

export default [
    index("routes/cafeteria.tsx"),
    route("catering-services", "routes/cateringServices.tsx"),
] satisfies RouteConfig;
