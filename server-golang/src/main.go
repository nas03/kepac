package main

import (
	"server/src/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	routes.GeoTIFFRoutes(app)
	app.Listen(":3000")
}
