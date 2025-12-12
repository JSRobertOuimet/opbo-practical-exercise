export type MealTier = "standard" | "premium";
export type MealType = "breakfast" | "lunch" | "dinner";
export type MenuMeal = {
    name: string;
    description: string;
    dietaryOptions: string[];
    price: number | null;
};
