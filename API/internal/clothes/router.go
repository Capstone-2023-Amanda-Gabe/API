package clothes

import (
	"github.com/gofiber/fiber/v2"
)

func AddClothesRoutes(app *fiber.App, controller *ClothesController) {
	clothes := app.Group("/clothes")
	// add middlewares here

	// add routes here
	clothes.Post("/", controller.create)
	clothes.Get("/", controller.getAll)
	clothes.Get("/:id", controller.getClothesByUser)
	clothes.Delete("/:id", controller.deleteClothingArticle)
}
