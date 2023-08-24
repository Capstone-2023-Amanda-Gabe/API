package days

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// how the day is stored in the database
type dayDB struct {
	ID          primitive.ObjectID `bson:"_id" json:"id"`
	Title       string             `bson:"title" json:"title"`
	Description string             `bson:"description" json:"description"`
	Completed   bool               `bson:"completed" json:"completed"`
}

type dayStorage struct {
	db *mongo.Database
}

func NewdayStorage(db *mongo.Database) *dayStorage {
	return &dayStorage{
		db: db,
	}
}

func (s *dayStorage) createday(title, description string, completed bool, ctx context.Context) (string, error) {
	collection := s.db.Collection("days")

	result, err := collection.InsertOne(ctx, bson.M{"title": title, "description": description, "completed": completed})
	if err != nil {
		return "", err
	}

	// convert the object id to a string
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (s *dayStorage) getAlldays(ctx context.Context) ([]dayDB, error) {
	collection := s.db.Collection("days")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	days := make([]dayDB, 0)
	if err = cursor.All(ctx, &days); err != nil {
		return nil, err
	}

	return days, nil
}
