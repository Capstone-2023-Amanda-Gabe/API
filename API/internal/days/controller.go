package days

import (
	"github.com/gofiber/fiber/v2"
)

type dayController struct {
	storage *dayStorage
}

func NewdayController(storage *dayStorage) *dayController {
	return &dayController{
		storage: storage,
	}
}

type createdayRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type createdayResponse struct {
	ID string `json:"id"`
}

// @Summary		Create one day.
// @Description	creates one day.
// @Tags			days
// @Accept			*/*
// @Produce		json
// @Param			day	body		createdayRequest	true	"day to create"
// @Success		200		{object}	createdayResponse
// @Router			/days [post]
func (t *dayController) create(c *fiber.Ctx) error {
	// parse the request body
	var req createdayRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	// create the day
	id, err := t.storage.createday(req.Title, req.Description, false, c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create day",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(createdayResponse{
		ID: id,
	})
}

// @Summary		Get all days.
// @Description	fetch every day available.
// @Tags			days
// @Accept			*/*
// @Produce		json
// @Success		200	{object}	[]dayDB
// @Router			/days [get]
func (t *dayController) getAll(c *fiber.Ctx) error {
	// get all days
	days, err := t.storage.getAlldays(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get days",
		})
	}

	return c.JSON(days)
}
