package users

import (
	"github.com/gofiber/fiber/v2"
)

type UserController struct {
	storage *UserStorage
}

func NewUserController(storage *UserStorage) *UserController {
	return &UserController{
		storage: storage,
	}
}

type createUserRequest struct {
	ClerkID string `json:"title"`
	Name    string `json:"description"`
}

type createUserResponse struct {
	ID string `json:"id"`
}

// @Summary		Create one user.
// @Description	creates one user.
// @Tags			users
// @Accept			*/*
// @Produce		json
// @Param			user	body		createuserRequest	true	"user to create"
// @Success		200		{object}	createuserResponse
// @Router			/users [post]
func (t *UserController) create(c *fiber.Ctx) error {
	// parse the request body
	var req createUserRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	// create the user

	id, err := t.storage.createUser(req.ClerkID, req.Name, c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create user",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(createUserResponse{
		ID: id,
	})
}

// @Summary		Get all users.
// @Description	fetch every user available.
// @Tags			users
// @Accept			*/*
// @Produce		json
// @Success		200	{object}	[]userDB
// @Router			/users [get]
func (t *UserController) getAll(c *fiber.Ctx) error {
	// get all users
	users, err := t.storage.getAllUsers(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get users",
		})
	}

	return c.JSON(users)
}
