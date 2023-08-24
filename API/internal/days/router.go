package days

import "github.com/gofiber/fiber/v2"

func AdddayRoutes(app *fiber.App, controller *dayController) {
	days := app.Group("/days")

	days.Post("/", controller.create)
	days.Get("/", controller.getAll)
}
