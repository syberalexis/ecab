package model

type User struct {
	Id       uint   `json:"id,omitempty"`
	Login    string `json:"login"`
	Password string `json:"password,omitempty"`
}
