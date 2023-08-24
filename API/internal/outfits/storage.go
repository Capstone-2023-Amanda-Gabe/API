package outfits

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// how the outfit is stored in the database

type outfitDB struct {
	User_id     string             `bson:"user_id" json:"user_id"`
	ID          primitive.ObjectID `bson:"_id" json:"id"`
	Title       string             `bson:"title" json:"title"`
	Description string             `bson:"description" json:"description"`
	Clothes     []Clothes          `bson:"completed" json:"completed"`
}

type outfitStorage struct {
	db *mongo.Database
}

func NewoutfitStorage(db *mongo.Database) *outfitStorage {
	return &outfitStorage{
		db: db,
	}
}

func (s *outfitStorage) createoutfit(user_id string, title string, description string, clothes []Clothes, ctx context.Context) (string, error) {
	collection := s.db.Collection("outfits")

	result, err := collection.InsertOne(ctx, bson.M{"user_id": user_id, "title": title, "description": description, "clothes": clothes})
	if err != nil {
		return "", err
	}

	// convert the object id to a string
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (s *outfitStorage) getAlloutfits(ctx context.Context) ([]outfitDB, error) {
	collection := s.db.Collection("outfits")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	outfits := make([]outfitDB, 0)
	if err = cursor.All(ctx, &outfits); err != nil {
		return nil, err
	}

	return outfits, nil
}
