import {Recipe} from "../model/Recipe";
import {Ingredient} from "../model/Ingredient";
import {Steps} from "../model/Steps";

let recipes: Recipe[] = [
  new Recipe(
    "Prosciutto Pizza",
    "https://www.thespruceeats.com/prosciutto-pizza-4844358",
    "Ah, prosciutto pizza! The epic collision of two titanic Italian inventions explodes with spectacular umami flavor, balanced here by the dreamy, delicate flavor of burrata, and the peppery zip of bright green arugula. " +
    "Like most great Italian dishes, this pizza is all about quality ingredients and simple preparation. It's a dish of harmonious counterpoint. Less is more. Don't bog down your slice. Remember, Michelangelo's David emerged from a single block of marble. Keep the sauce and toppings light, and bake the pizza with only cheese and sauce, adding the prosciutto, arugula, and Parmesan afterward. Your prosciutto will stay silky and tender, and your arugula will hold its vibrant snap. Finish with some shaved Parmesan (better yet, real Parmigiano-Reggiano), a dash of the best olive oil you can afford, and your masterpiece will be complete.",
    [
      new Ingredient("1 tablespoon tomato paste"),
      new Ingredient("Salt, to taste"),
      new Ingredient("2 tablespoons all-purpose flour"),
      new Ingredient("1 ball pizza dough, about 175 grams, store-bought or homemade"),
      new Ingredient("3 ounces burrata cheese, cut into 1-inch pieces"),
      new Ingredient("4 thin slices prosciutto, torn in half lengthwise"),
      new Ingredient("1/2 cup lightly packed arugula leaves"),
      new Ingredient("Extra-virgin olive oil, for drizzling"),
      new Ingredient("1/4 cup shaved Parmesan cheese"),
    ], [
      new Steps(1, "Gather the ingredients."),
      new Steps(2, "Heat pizza oven to 800 F. See recipe variation for preheating a home oven, at bottom of recipe."),
      new Steps(3, "Put the tomato paste into a small bowl. Add 1 tablespoon of water and the salt and stir to combine. Add a tiny bit more water to achieve a spreadable consistency."),
      new Steps(4, "Dust the pizza peel with plenty of flour, and flour your hands. Gently stretch your pizza dough into a circle approximately 12 inches in diameter. Set it on the well-floured peel."),
      new Steps(5, "Using the back of a spoon, gently spread your tomato sauce onto the dough. Leave the outer edge of the dough bare."),
      new Steps(6, "Distribute the burrata onto the pizza. Move expeditiously. The longer the sauced dough sits on the peel, the more likely it will be to stick when you try to slide it into the oven."),
      new Steps(7, "Put the pizza in the oven, rotating as needed. Bake until the crust has risen and the cheese is bubbly, about 2 minutes. Some light charring at the edges of the crust is excellent. Remove from oven."),
      new Steps(8, "Layer the prosciutto and arugula onto the pizza. Drizzle with extra-virgin olive oil to taste. Top with the shaved Parmesan cheese. Slice and serve immediately."),
    ]),
  new Recipe(
    "Homemade Pizza & Pizza Dough",
    "https://www.simplyrecipes.com/recipes/homemade_pizza/",
"This is a classic homemade pizza recipe, including a pizza dough recipe, topping suggestions, and step-by-step instructions with photos. Make perfect pizza at home!"
    ,   [
      new Ingredient("1 1/2 cups (355 ml) warm water (105°F-115°F)"),
      new Ingredient("1 package (2 1/4 teaspoons) active dry yeast"),
      new Ingredient("3 3/4 cups (490 g) bread flour\n"),
      new Ingredient("2 tablespoons extra virgin olive oil (omit if cooking pizza in a wood-fired pizza oven)"),
      new Ingredient("2 teaspoons salt"),
      new Ingredient("1 teaspoon sugar"),
    ], [
      new Steps(1, "Place the warm water in the large bowl of a heavy duty stand mixer. Sprinkle the yeast over the warm water and let it sit for 5 minutes until the yeast is dissolved.\n" +
        "\n" +
        "After 5 minutes stir if the yeast hasn't dissolved completely. The yeast should begin to foam or bloom, indicating that the yeast is still active and alive.\n" +
        "\n" +
        "(Note that if you are using \"instant yeast\" instead of \"active yeast\", no proofing is required. Just add to the flour in the next step.)"),
      new Steps(2, "Add the flour, salt, sugar, and olive oil, and using the mixing paddle attachment, mix on low speed for a minute. Then replace the mixing paddle with the dough hook attachment.\n" +
        "\n" +
        "Knead the pizza dough on low to medium speed using the dough hook about 7-10 minutes.\n" +
        "\n" +
        "If you don't have a mixer, you can mix the ingredients together and knead them by hand.\n" +
        "\n" +
        "The dough should be a little sticky, or tacky to the touch. If it's too wet, sprinkle in a little more flour."),
      new Steps(3, "Spread a thin layer of olive oil over the inside of a large bowl. Place the pizza dough in the bowl and turn it around so that it gets coated with the oil.\n" +
        "\n" +
        "At this point you can choose how long you want the dough to ferment and rise. A slow fermentation (24 hours in the fridge) will result in more complex flavors in the dough. A quick fermentation (1 1/2 hours in a warm place) will allow the dough to rise sufficiently to work with.\n" +
        "\n" +
        "Cover the dough with plastic wrap.\n" +
        "\n" +
        "For a quick rise, place the dough in a warm place (75°F to 85°F) for 1 1/2 hours.\n" +
        "\n" +
        "For a medium rise, place the dough in a regular room temperature place (your kitchen counter will do fine) for 8 hours. For a longer rise, chill the dough in the refrigerator for 24 hours (no more than 48 hours).\n" +
        "\n" +
        "The longer the rise (to a point) the better the flavor the crust will have."),
      new Steps(4, "After the pizza dough has risen, you can freeze it to use later. Divide the dough in half (or the portion sizes you will be using to make your pizzas). Place on parchment paper or a lightly floured dish and place, uncovered, in the freezer for 15 to 20 minutes. Then remove from the freezer, and place in individual freezer bags, removing as much air as you can from the bags. Return to the freezer and store for up to 3 months.\n" +
        "\n" +
        "Thaw the pizza dough in the refrigerator overnight or for 5 to 6 hours. Then let the dough sit at room temperature for 30 minutes before stretching it out in the next steps."),
      ]),
  new Recipe(
    "How To Make The Best Homemade Pizza\n",
    "https://tasty.co/recipe/pizza-dough",
"Making homemade pizza dough can sound like a lot of work, but it’s so worth the bragging rights. The dough itself requires few ingredients and just a little bit of rising and rest time. While you wait for the dough to be ready, you can get to work prepping your tomato sauce, chopping fresh vegetables, or grating the cheese you’ll put on top. Bake for 15 minutes, garnish with basil (or, let’s be real, more cheese), and enjoy showing off your way-better-than-takeout creation."
    ,    [
      new Ingredient("2 ½ cups warm water (600 mL)"),
      new Ingredient("1 teaspoon sugar\n"),
      new Ingredient("2 teaspoons active dry yeast\n"),
      new Ingredient("7 cups all-purpose flour (875 g), plus more for dusting"),
      new Ingredient("6 tablespoons extra virgin olive oil, plus more for greasing"),
      new Ingredient("1 ½ teaspoons kosher salt"),
      new Ingredient("¼ cup semolina flour (30 g)"),
    ], [
      new Steps(1, "“Bloom” the yeast by sprinkling the sugar and yeast in the warm water. Let sit for 10 minutes, until bubbles form on the surface."),
      new Steps(2, "In a large bowl, combine the flour and salt. Make a well in the middle and add the olive oil and bloomed yeast mixture. Using a spoon, mix until a shaggy dough begins to form."),
      new Steps(3, "Once the flour is mostly hydrated, turn the dough out onto a clean work surface and knead for 10-15 minutes. The dough should be soft, smooth, and bouncy. Form the dough into a taut round."),
      new Steps(4, "Grease a clean, large bowl with olive oil and place the dough inside, turning to coat with the oil. Cover with plastic wrap. Let rise for at least an hour, or up to 24 hours."),
      new Steps(5, "Punch down the dough and turn it out onto a lightly floured work surface. Knead for another minute or so, then cut into 4 equal portions and shape into rounds."),
      new Steps(6, "Lightly flour the dough, then cover with a kitchen towel and let rest for another 30 minutes to an hour while you prepare the sauce and any other ingredients."),
      new Steps(7, "Preheat the oven as high as your oven will allow, between 450-500˚F (230-260˚C). Place a pizza stone, heavy baking sheet (turn upside down so the surface is flat), or cast iron skillet in the oven."),
      new Steps(8, "Meanwhile, make the tomato sauce: Add the salt to the can of tomatoes and puree with an immersion blender, or transfer to a blender or food processor, and puree until smooth."),
      new Steps(9, "Once the dough has rested, take a portion and start by poking the surface with your fingertips, until bubbles form and do not deflate."),
      new Steps(10, "Then, stretch and press the dough into a thin round. Make it thinner than you think it should be, as it will slightly shrink and puff up during baking."),
      new Steps(11, "Sprinkle semolina onto an upside down baking sheet and place the stretched crust onto it. Add the sauce and ingredients of your choice."),
      new Steps(12, "Slide the pizza onto the preheated pizza stone or pan. Bake for 15 minutes, or until the crust and cheese are golden brown."),
      new Steps(13, "Add any garnish of your preference.\n"),
      new Steps(14, "Nutrition Calories: 1691 Fat: 65 grams Carbs: 211 grams Fiber: 12 grams Sugars: 60 grams Protein: 65 grams"),
      new Steps(15, "Enjoy!\n"),

    ])
];

export {recipes};
