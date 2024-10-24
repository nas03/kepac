package main

import (
	"server/src/config"
	"server/src/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// Initialize
	app := fiber.New()
	app.Use(cors.New())
	// DB
	config.InitializeDB()

	// Config routes
	routes.GeoTIFFRoutes(app)

	app.Listen(":3000")

}
