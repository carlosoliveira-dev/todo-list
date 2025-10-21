package model

type Task struct {
	Description string `json:"description"`
	Done        bool   `json:"done"`
}

type TaskWithID struct {
	Id          int    `json:"id"`
	Description string `json:"description"`
	Done        bool   `json:"done"`
}
