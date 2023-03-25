package main

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/syberalexis/ecab/m/v2/pkg/database"

	"github.com/alecthomas/kingpin/v2"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/syberalexis/ecab/m/v2/pkg/service"
)

var (
	// Default variables
	version        = "dev"
	defaultPort    = 8080
	defaultAddress = "0.0.0.0"
	defaultDBHost  = "/tmp/ecab.db"

	app        = kingpin.New(filepath.Base(os.Args[0]), "")
	appVersion = app.Version(version)
	help       = app.HelpFlag.Short('h')
	debug      = app.Flag("debug", "Enable debug mode.").Bool()

	address = app.Flag("address", "Listen address").Default(fmt.Sprintf("%s", defaultAddress)).Short('a').String()
	port    = app.Flag("port", "Listen port").Default(fmt.Sprintf("%d", defaultPort)).Short('p').Int()

	db_host     = app.Flag("db_host", "Database host address").Default(fmt.Sprintf("%s", defaultDBHost)).String()
	db_user     = app.Flag("db_user", "Database user").String()
	db_password = app.Flag("db_password", "Database password").String()
)

// ECAB command main
func main() {
	// Main action
	app.Action(func(c *kingpin.ParseContext) error { run(); return nil })

	// Parsing
	args, err := app.Parse(os.Args[1:])

	if err != nil {
		log.Error(errors.Wrapf(err, "Error parsing commandline arguments"))
		app.Usage(os.Args[1:])
		os.Exit(2)
	} else {
		kingpin.MustParse(args, err)
	}
}

// Main run function
func run() {
	if debug != nil && *debug {
		log.SetLevel(log.DebugLevel)
		log.Info("Debug mode enabled !")
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	if database.InitDB(*db_host) != nil {
		log.Fatal("Error when initialize Database.")
	}

	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./ui/build", true)))

	api := router.Group("/api")
	service.InitUserService(api)

	router.Run(fmt.Sprintf("%s:%d", *address, *port))
}
