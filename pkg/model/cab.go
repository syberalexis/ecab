package model

import "time"

type Cab struct {
	Title          string
	Description    string
	Impacts        Impacts
	Writer         User
	Reviewers      []User
	Start          time.Time
	End            time.Time
	Roadmap        Roadmap
	Communications Communications
}
