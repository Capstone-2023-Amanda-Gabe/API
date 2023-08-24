package outfits

import "github.com/gofiber/fiber/v2"

func AddoutfitRoutes(app *fiber.App, controller *outfitController) {
	outfits := app.Group("/outfits")

	outfits.Post("/", controller.create)
	outfits.Get("/", controller.getAll)
}
