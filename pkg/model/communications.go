package model

type Communications struct {
	Precommunication Message
	StartOperation   Message
	MiddleOperations []Message
	EndOperation     Message
}
