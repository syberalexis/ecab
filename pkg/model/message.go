package model

type Message struct {
	Type   MessageType
	Title  string
	Sender string
	To     []string
	Text   string
}
