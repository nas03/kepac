package controller

import "github.com/gofiber/fiber/v2"

func uploadDataset(c *fiber.Ctx) error {
	return c.SendString("test string")
}
