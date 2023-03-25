package database

import (
	"errors"

	log "github.com/sirupsen/logrus"
	"github.com/syberalexis/ecab/m/v2/pkg/model"
	"gorm.io/gorm"
)

type User struct {
	ID       uint `gorm:"primaryKey"`
	Login    string
	Password string
}

func CreateUser(user model.User) *model.User {
	dbUser := modelToDb(&user)
	DB.Create(dbUser)
	return dbToModel(dbUser)
}

func GetUserById(id int) *model.User {
	log.Debugf("GetUserById : %d", id)

	var dbUser User
	result := DB.First(&dbUser, id)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil
	}
	log.Debugf("Count : %d, Id : %d, Login: %s", result.RowsAffected, dbUser.ID, dbUser.Login)

	return dbToModel(&dbUser)
}

func GetUsers() []model.User {
	var users []User
	_ = DB.Find(&users)

	return dbsToModels(users)
}

func dbToModel(dbUser *User) *model.User {
	if dbUser == nil {
		return nil
	}

	log.Debugf("Id : %d, Login: %s", dbUser.ID, dbUser.Login)

	return &model.User{
		Id:       dbUser.ID,
		Login:    dbUser.Login,
		Password: dbUser.Password,
	}
}

func modelToDb(user *model.User) *User {
	if user == nil {
		return nil
	}

	log.Debugf("Id : %d, Login: %s", user.Id, user.Login)

	return &User{
		ID:       user.Id,
		Login:    user.Login,
		Password: user.Password,
	}
}

func dbsToModels(dbUsers []User) []model.User {
	users := []model.User{}

	for _, dbUser := range dbUsers {
		user := *dbToModel(&dbUser)
		users = append(users, user)
	}

	return users
}

func modelsToDbs(users []model.User) []User {
	dbUsers := []User{}

	for _, user := range users {
		dbUser := *modelToDb(&user)
		dbUsers = append(dbUsers, dbUser)
	}

	return dbUsers
}
