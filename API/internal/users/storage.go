package users

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// how the todo is stored in the database
type userDB struct {
	ID      primitive.ObjectID `bson:"_id" json:"id"`
	ClerkID string             `bson:"ClerkID" json:"ClerkID"`
	Name    string             `bson:"name" json:"name"`
}

type UserStorage struct {
	db *mongo.Database
}

func NewUserStorage(db *mongo.Database) *UserStorage {
	return &UserStorage{
		db: db,
	}
}

func (s *UserStorage) createUser(ClerkID string, Name string, ctx context.Context) (string, error) {
	collection := s.db.Collection("users")

	result, err := collection.InsertOne(ctx, bson.M{"ClerkID": ClerkID, "name": Name})
	if err != nil {
		return "", err
	}

	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (s *UserStorage) getAllUsers(ctx context.Context) ([]userDB, error) {
	collection := s.db.Collection("users")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	todos := make([]userDB, 0)
	if err = cursor.All(ctx, &todos); err != nil {
		return nil, err
	}

	return todos, nil
}
