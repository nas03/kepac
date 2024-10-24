package config

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
)

type Config struct {
	DB DBConfig
}

type DBConfig struct {
	dbName     string
	dbUser     string
	dbPassword string
	dbHost     string
	dbPort     int
}

func LoadConfig() (*Config, error) {

	cfg := &Config{
		DB: DBConfig{
			dbName:     "postgres",
			dbUser:     "postgres.zfydybjluphaiojkxols",
			dbPassword: os.Getenv("DB_PASSWORD"),
			dbHost:     "aws-0-ap-southeast-1.pooler.supabase.com",
			dbPort:     6543,
		},
	}
	return cfg, nil
}
