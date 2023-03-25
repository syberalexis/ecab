package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB(host string) error {
	var err error

	sqlitedb := sqlite.Open(host)
	DB, err = gorm.Open(sqlitedb, &gorm.Config{})

	if err != nil {
		return err
	}

	DB.AutoMigrate(&User{})

	return nil
}
