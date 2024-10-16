package controller

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
)

func GetGeoTIFF(c *fiber.Ctx) error {
	time := c.Query("time", "")
	if time == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Time is not specified",
			"data":    nil,
		})
	}

	// Replace this with your actual logic to get the GeoTIFF file
	/* geoTIFFFile, err := precipitationRepository.GetGeoTIFFFile(time)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Server Error",
			"data":    nil,
		})
	}
	*/
	/* if geoTIFFFile == nil {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":  "success",
			"message": nil,
			"data":    nil,
		})
	} */
	filePath := `assets/geotiff/${geoTIFFFile.file_name}`
	// filePath := filepath.Join("assets", "geotiff", geoTIFFFile.FileName)

	// Check if file exists
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		log.Println("File not found:", err)
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "File not found",
			"data":    nil,
		})
	}

	// Set headers for the TIFF file
	c.Set("Content-Type", "image/tiff")
	c.Set("Content-Disposition", `attachment; filename="Radar_20201001000000.tif"`)

	// Send the file
	return c.SendFile(filePath)
}
