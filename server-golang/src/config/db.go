package config

import (
	"fmt"
	"log"
	"time"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitializeDB() {
	var err error
	err = godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file", err)
	}
	dbConfig, err := LoadConfig()
	if err != nil {
		log.Fatal("Error loading config", err)
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable",
		dbConfig.DB.dbHost,
		dbConfig.DB.dbUser,
		dbConfig.DB.dbPassword,
		dbConfig.DB.dbName,
		dbConfig.DB.dbPort,
	)

	DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatal("Failed to get database instance: ", err)
	}

	// Set connection pool settings
	sqlDB.SetMaxIdleConns(10)                  // Maximum number of idle connections
	sqlDB.SetMaxOpenConns(100)                 // Maximum number of open connections
	sqlDB.SetConnMaxLifetime(time.Hour)        // Maximum lifetime of a connection
	sqlDB.SetConnMaxIdleTime(30 * time.Minute) // Maximum idle time for a connection

	// Verify connection
	err = sqlDB.Ping()
	if err != nil {
		log.Fatal("Error pinging database: ", err)
	}

	log.Println("Successfully connected to database")

}
func GetDB() *gorm.DB {
	return DB
}
