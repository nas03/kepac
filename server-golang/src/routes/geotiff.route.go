package routes

import (
	"server/src/controller"

	"github.com/gofiber/fiber/v2"
)

func GeoTIFFRoutes(app *fiber.App) {
	app.Get("/geotiff", controller.GetGeoTIFF)
	app.Post("fds")
	app
}
