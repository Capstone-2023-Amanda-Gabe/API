package outfits

import (
	"github.com/gofiber/fiber/v2"
)

type outfitController struct {
	storage *outfitStorage
}

func NewoutfitController(storage *outfitStorage) *outfitController {
	return &outfitController{
		storage: storage,
	}
}

type Clothes struct {
	ID          string `json:"id"`
	User_id     string `json:"user_id"`
	Image_url   string `json:"image_url"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type createoutfitRequest struct {
	User_id     string    `json:"user_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Clothes     []Clothes `json:"completed"`
}

type createoutfitResponse struct {
	ID string `json:"id"`
}

// @Summary		Create one outfit.
// @Description	creates one outfit.
// @Tags			outfits
// @Accept			*/*
// @Produce		json
// @Param			outfit	body		createoutfitRequest	true	"outfit to create"
// @Success		200		{object}	createoutfitResponse
// @Router			/outfits [post]
func (t *outfitController) create(c *fiber.Ctx) error {
	var req createoutfitRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	id, err := t.storage.createoutfit(req.User_id, req.Title, req.Description, req.Clothes, c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create outfit",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(createoutfitResponse{
		ID: id,
	})
}

// @Summary		Get all outfits.
// @Description	fetch every outfit available.
// @Tags			outfits
// @Accept			*/*
// @Produce		json
// @Success		200	{object}	[]outfitDB
// @Router			/outfits [get]
func (t *outfitController) getAll(c *fiber.Ctx) error {
	// get all outfits
	outfits, err := t.storage.getAlloutfits(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get outfits",
		})
	}

	return c.JSON(outfits)
}
