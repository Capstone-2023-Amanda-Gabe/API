package config

import (
	"errors"
	"os"

	"github.com/spf13/viper"
)

type EnvVars struct {
	MONGODB_URI            string `mapstructure:"MONGODB_URI"`
	MONGODB_NAME           string `mapstructure:"MONGODB_NAME"`
	PORT                   string `mapstructure:"PORT"`
	CLOUDINARY_CLOUD_NAME  string `mapstructure:"CLOUDINARY_CLOUD_NAME"`
	CLOUNDINARY_API_KEY    string `mapstructure:"CLOUNDINARY_API_KEY"`
	CLOUDINARY_API_SECRET  string `mapstructure:"CLOUDINARY_API_SECRET"`
	CLOUDINARY_API_ENV_VAR string `mapstructure:"CLOUDINARY_API_ENV_VAR"`
}

func LoadConfig() (config EnvVars, err error) {
	env := os.Getenv("GO_ENV")
	if env == "production" {
		return EnvVars{
			MONGODB_URI:            os.Getenv("MONGODB_URI"),
			MONGODB_NAME:           os.Getenv("MONGODB_NAME"),
			PORT:                   os.Getenv("PORT"),
			CLOUDINARY_CLOUD_NAME:  os.Getenv("CLOUDINARY_CLOUD_NAME"),
			CLOUNDINARY_API_KEY:    os.Getenv("CLOUNDINARY_API_KEY"),
			CLOUDINARY_API_SECRET:  os.Getenv("CLOUDINARY_API_SECRET"),
			CLOUDINARY_API_ENV_VAR: os.Getenv("CLOUDINARY_API_ENV_VAR"),
		}, nil
	}

	viper.AddConfigPath(".")
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)

	// validate config here
	if config.MONGODB_URI == "" {
		err = errors.New("MONGODB_URI is required")
		return
	}

	if config.MONGODB_NAME == "" {
		err = errors.New("MONGODB_NAME is required")
		return
	}

	if config.CLOUDINARY_CLOUD_NAME == "" {
		err = errors.New("CLOUDINARY_CLOUD_NAME is required")
		return
	}

	if config.CLOUNDINARY_API_KEY == "" {
		err = errors.New("CLOUNDINARY_API_KEY is required")
		return
	}

	if config.CLOUDINARY_API_SECRET == "" {
		err = errors.New("CLOUDINARY_API_SECRET is required")
		return
	}

	if config.CLOUDINARY_API_ENV_VAR == "" {
		err = errors.New("CLOUDINARY_API_ENV_VAR is required")
		return
	}

	return
}
