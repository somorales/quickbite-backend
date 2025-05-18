const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const recetaToString = (receta) => {
  return `
  Meal: ${receta.name}
  Frequency: ${receta.quantity}
  Ingredients: ${receta.ingredients.join(", ")} 
`;
};

router.post("/", async (req, res) => {
  const meals = req.body.meals;

  if (!Array.isArray(meals)) {
    return res.status(400).json({ error: "Se espera un array de recetas" });
  }

  const prompt = `
You're given a list of meals. Each includes how many times it will be eaten and its ingredients.

Create a grocery list by multiplying each ingredient by the meal's frequency and combining duplicate ingredients across meals.

Meals:

${meals.map((meal) => recetaToString(meal)).join("\n")}
`;

  console.log(prompt);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Your are a grocery shopping helper. You generate grocery shopping lists for your users.",
        },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          strict: true,
          name: "grocery_list",
          schema: {
            type: "object",
            properties: {
              elements: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    ingredient: {
                      type: "string",
                    },
                    quantity: {
                      type: "integer",
                    },
                  },
                  required: ["ingredient", "quantity"],
                  additionalProperties: false,
                },
              },
            },
            required: ["elements"],
            additionalProperties: false,
          },
        },
      },
    });
    const listaUnificada = JSON.parse(completion.choices[0].message.content);
    res.json(listaUnificada);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error al generar la lista con ChatGPT" });
  }
});

module.exports = router;
