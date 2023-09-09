package clothes

import (
	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gofiber/fiber/v2"
)

type ClothesController struct {
	storage          *ClothesStorage
	CloudinaryClient *CloudinaryClient
}

type CloudinaryClient struct {
	CLOUDINARY_CLOUD_NAME  string
	CLOUNDINARY_API_KEY    string
	CLOUDINARY_API_SECRET  string
	CLOUDINARY_API_ENV_VAR string
}

func NewCloudinaryClient(
	CLOUDINARY_CLOUD_NAME string,
	CLOUNDINARY_API_KEY string,
	CLOUDINARY_API_SECRET string,
	CLOUDINARY_API_ENV_VAR string,
) *CloudinaryClient {
	return &CloudinaryClient{
		CLOUDINARY_CLOUD_NAME:  CLOUDINARY_CLOUD_NAME,
		CLOUNDINARY_API_KEY:    CLOUNDINARY_API_KEY,
		CLOUDINARY_API_SECRET:  CLOUDINARY_API_SECRET,
		CLOUDINARY_API_ENV_VAR: CLOUDINARY_API_ENV_VAR,
	}
}
func NewClothesController(storage *ClothesStorage, CloudinaryClient *CloudinaryClient) *ClothesController {
	return &ClothesController{
		storage:          storage,
		CloudinaryClient: CloudinaryClient,
	}
}

type createClothesRequest struct {
	User_id     string `json:"user_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type createClothesResponse struct {
	ID string `json:"id"`
}

// @Summary		Create one article of clothing.
// @Description	Create one article of clothing.
// @Tags			clothes
// @Accept			*/*
// @Produce		json
// @Param		clothes		body		createClothesRequest	true	"Clothes to create"
// @Success		200		{object}	createlothesResponse
// @Router			/clothes [post]
func (t *ClothesController) create(c *fiber.Ctx) error {
	// parse the request body
	file, err := c.FormFile("image")

	if err != nil {
		return err
	}

	c.SaveFile(file, "uploads/"+file.Filename)

	cld, err := cloudinary.NewFromParams(
		t.CloudinaryClient.CLOUDINARY_CLOUD_NAME,
		t.CloudinaryClient.CLOUNDINARY_API_KEY,
		t.CloudinaryClient.CLOUDINARY_API_SECRET,
	)

	if err != nil {
		return err
	}

	resp, err := cld.Upload.Upload(c.Context(), "uploads/"+file.Filename, uploader.UploadParams{PublicID: file.Filename})
	if err != nil {
		return err
	}

	var req createClothesRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	id, err := t.storage.createClothes(req.User_id, resp.SecureURL, req.Name, req.Description, c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create Clothing article",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(createClothesResponse{
		ID: id,
	})
}

// @Summary		fetch all clothes.
// @Description	fetch all clothes.
// @Tags			clothes
// @Accept			*/*
// @Produce		json
// @Success		200	{object}	[]clothesDB
// @Router			/clothes [get]
func (t *ClothesController) getAll(c *fiber.Ctx) error {
	// get all clothes
	clothes, err := t.storage.getAllClothes(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get clothes",
		})
	}

	return c.JSON(clothes)
}

// @Summary		fetch all clothes by user.
// @Description	fetch all clothes by user.
// @Tags			clothes
// @Accept			*/*
// @Produce		json
// @Success		200	{object}	[]clothesDB
// @Router			/clothes [get]
func (t *ClothesController) getClothesByUser(c *fiber.Ctx) error {
	params := c.AllParams()
	clothes, err := t.storage.getClothesByUser(c.Context(), params["id"])

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get clothes",
		})
	}
	return c.JSON(clothes)
}

func (t *ClothesController) deleteClothingArticle(c *fiber.Ctx) error {
	params := c.AllParams()

	deleted, err := t.storage.Delete(c.Context(), params["id"])

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get clothes",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"Number of Objects Deleted": deleted,
	})

}
