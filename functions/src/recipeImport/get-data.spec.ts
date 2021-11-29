import {getData2} from "./core";
import {Recipe} from "../../../shared/model/Recipe";
import {Ingredient} from "../../../shared/model/Ingredient";
import {Steps} from "../../../shared/model/Steps";

/** Original data **/
const url = "https://www.allrecipes.com/recipe/26003/simple-chocolate-strawberry-shortcake/"

/** test result data **/
const result = new Recipe(
    "",
    "Simple Chocolate Strawberry Shortcake")
result.url = "https://www.allrecipes.com/recipe/26003/simple-chocolate-strawberry-shortcake/"
result.description = "A chocolate version of everybody's favorite dessert."
result.calories = 249
result.totalCookTime = 52
result.ingredients = [
    new Ingredient("(1 ounce) squares unsweetened chocolate, chopped", 2, "pieces"),
    new Ingredient("all-purpose flour", 1.5, "cups"),
    new Ingredient("baking powder", 0.5, "teaspoon"),
    new Ingredient("baking soda", 1, "teaspoon"),
    new Ingredient("salt", 0.5, "teaspoon"),
    new Ingredient("white sugar", 0.5, "cup"),
    new Ingredient("margarine", 0.333, "cup"),
    new Ingredient("sour milk", 1, "cup"),
    new Ingredient("orange liqueur ", 2, "tablespoons"),
    new Ingredient("(16 ounce) package frozen whipped topping, thawed", 1, "piece"),
    new Ingredient("fresh strawberries", 1, "quart"),
    new Ingredient("(1 ounce) squares semisweet chocolate, chopped", 2, "pieces")
]
result.steps = [
    new Steps(1, "Preheat oven to 400 degrees F (200 degrees C). Grease and flour 2 (9 inch) pans. In the top of a double boiler, heat unsweetened chocolate, stirring occasionally, until chocolate is melted and smooth. Remove from heat and allow to cool to lukewarm.\n"),
    new Steps(2, "In a large bowl, combine flour, baking powder, baking soda, salt and sugar. Cut in margarine until mixture resembles coarse crumbs. Blend in sour milk and melted unsweetened chocolate. Divide batter into prepared pans.\n"),
    new Steps(3, "Bake in the preheated oven for 15 to 20 minutes, or until a toothpick inserted into the center of the cake comes out clean. Allow to cool. Sprinkle cakes with orange liqueur.\n"),
    new Steps(4, "Reserve 8 to 10 strawberries and slice the rest. Place one cake on a serving plate, top with half of the sliced strawberries and half of whipped topping. Cover with second layer, top with remaining strawberries and whipped topping. Garnish with whole strawberries. In the top of a double boiler, heat semisweet chocolate, stirring occasionally, until chocolate is melted and smooth. Drizzle over the strawberries.\n")
]

/** test **/
describe('The recipe import final result', () => {

    /*const res:Recipe;
    run().then((r) => {
        res = r;

        it('should return a complete recipe from the URL', () => {
            expect(res.name).toEqual(result.name);
            expect(res.description).toEqual(result.description);
            expect(res.totalCookTime).toEqual(result.totalCookTime);
            expect(res.calories).toEqual(result.calories);
            expect(res.ingredients).toEqual(result.ingredients);
            expect(res.steps).toEqual(result.steps);
            expect(res.url).toEqual(result.url);
        });
    })*/

    it('should return a complete recipe from the URL', async() => {
        const res = await run()

        expect(res.name).toEqual(result.name);
        expect(res.description).toEqual(result.description);
        expect(res.totalCookTime).toEqual(result.totalCookTime);
        expect(res.calories).toEqual(result.calories);
        expect(res.ingredients).toEqual(result.ingredients);
        expect(res.steps).toEqual(result.steps);
        expect(res.url).toEqual(result.url);
    });
});

async function run(): Promise<Recipe> {
    const res = await getData2(url);
    return res
}
