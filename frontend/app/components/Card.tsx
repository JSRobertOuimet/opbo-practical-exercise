// Internationalization
import { useTranslation } from "react-i18next";

// Types
import type { Meal } from "~/types/types";
type CardProps = {
    meal: Meal;
};

// Components
import Tag from "./Tag";

const Card = ({ meal }: CardProps) => {
    const { t } = useTranslation();

    const formatPrice = (price: number | null) => {
        if (price == null) return;
        return `$${price}`;
    };

    if (meal.price === null) {
        return (
            <div className="flex flex-col items-center justify-center rounded border border-neutral-200 bg-neutral-50 p-6 text-neutral-600 not-last:mb-8">
                <p className="text-lg">
                    {t("pages.catering_services.menu_options.not_available", {
                        meal: meal.name.toLowerCase(),
                    })}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col rounded border border-neutral-200 bg-white px-6 pt-6 pb-4 not-last:mb-8">
            <div className="mb-4 flex items-end justify-between text-2xl font-bold">
                <h3>{meal.name}</h3>
                <span>{formatPrice(meal.price)}</span>
            </div>

            <p className="mb-4">{meal.description}</p>

            {meal.dietaryOptions.length > 0 && (
                <ul className="mb-4 flex w-full flex-wrap gap-x-8 gap-y-2">
                    {meal.dietaryOptions.map((option) => (
                        <Tag key={option} option={option} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Card;
