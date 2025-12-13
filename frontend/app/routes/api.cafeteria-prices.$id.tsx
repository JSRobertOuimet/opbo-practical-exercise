// Constants
import { CACHE_LIFESPAN } from "~/constants/cache";

// Types
import type { Route } from "./+types/api.cafeteria-prices.$id";
import type { MealTier, MealType } from "~/types/types";

type PricesByMeal = Record<MealType, number | null>;

type PricesByTier = Record<MealTier, PricesByMeal>;

type JsonPricesResponse = {
    standard_breakfast: number | null;
    standard_lunch: number | null;
    standard_dinner: number | null;
    premium_breakfast: number | null;
    premium_lunch: number | null;
    premium_dinner: number | null;
};

type CacheEntry = {
    prices: PricesByTier;
    cachedAt: number;
};

const cache = new Map<string, CacheEntry>();

export async function loader({ params, request }: Route.LoaderArgs) {
    const apiUrl = process.env.API_URL;
    const cafeteriaId = params.id;

    if (!apiUrl) {
        return Response.json(
            { message: "Environment variable 'API_URL' is not defined." },
            { status: 500 },
        );
    }

    if (!cafeteriaId) {
        return Response.json(
            { message: "cafeteria id is missing." },
            { status: 400 },
        );
    }

    const now = Date.now();
    const cached = cache.get(cafeteriaId);

    if (cached && now - cached.cachedAt < CACHE_LIFESPAN) {
        return Response.json({
            id: cafeteriaId,
            prices: cached.prices,
            cached: true,
        });
    }

    let response: Response;

    try {
        response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cafeteria_id: cafeteriaId }),
            signal: request.signal,
        });
    } catch (error: any) {
        if (error?.name === "AbortError") {
            return new Response(null, { status: 499 });
        }
        throw error;
    }

    if (!response.ok) {
        return Response.json(
            { message: `Upstream API failed (${response.status})` },
            { status: response.status },
        );
    }

    const json = (await response.json()) as JsonPricesResponse;

    const toPrice = (v: number | null | undefined) =>
        typeof v === "number" && !Number.isNaN(v) ? v : null;

    const prices: PricesByTier = {
        standard: {
            breakfast: toPrice(json.standard_breakfast),
            lunch: toPrice(json.standard_lunch),
            dinner: toPrice(json.standard_dinner),
        },
        premium: {
            breakfast: toPrice(json.premium_breakfast),
            lunch: toPrice(json.premium_lunch),
            dinner: toPrice(json.premium_dinner),
        },
    };

    cache.set(cafeteriaId, { prices, cachedAt: now });

    return Response.json({
        id: cafeteriaId,
        prices,
        cached: false,
    });
}
