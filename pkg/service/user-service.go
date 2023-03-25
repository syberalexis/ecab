package service

import (
	"net/http"
	"strconv"

	"github.com/syberalexis/ecab/m/v2/pkg/database"
	"github.com/syberalexis/ecab/m/v2/pkg/model"

	"github.com/gin-gonic/gin"
)

func InitUserService(router *gin.RouterGroup) {
	router.PUT("/user", createUser)
	router.GET("/user/:id", getUser)
	router.GET("/user", getUsers)
}

func createUser(c *gin.Context) {
	var user model.User

	if err := c.BindJSON(&user); err != nil {
		return
	}

	c.IndentedJSON(http.StatusCreated, *database.CreateUser(user))
}

func getUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": err.Error})
	}

	user := database.GetUserById(id)

	if user == nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "user not found"})
	} else {
		c.IndentedJSON(http.StatusOK, user)
	}
}

func getUsers(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, database.GetUsers())
}
