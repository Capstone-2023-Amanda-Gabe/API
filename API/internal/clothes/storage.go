package clothes

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type clothesDB struct {
	ID          primitive.ObjectID `bson:"_id" json:"id"`
	User_id     string             `bson:"user_id" json:"user_id"`
	Image_url   string             `bson:"image_url" json:"image_url"`
	Name        string             `bson:"name" json:"name"`
	Description string             `bson:"description" json:"description"`
}

type ClothesStorage struct {
	db *mongo.Database
}

func NewClothesStorage(db *mongo.Database) *ClothesStorage {
	return &ClothesStorage{
		db: db,
	}
}

func (s *ClothesStorage) createClothes(user_id string, description string, image_url string, name string, ctx context.Context) (string, error) {
	collection := s.db.Collection("clothes")

	result, err := collection.InsertOne(ctx, bson.M{"user_id": user_id, "description": description, "image_url": image_url, "name": name})
	if err != nil {
		return "", err
	}

	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (s *ClothesStorage) getAllClothes(ctx context.Context) ([]clothesDB, error) {
	collection := s.db.Collection("clothes")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	clothes := make([]clothesDB, 0)
	if err = cursor.All(ctx, &clothes); err != nil {
		return nil, err
	}

	return clothes, nil
}

func (s *ClothesStorage) getClothesByUser(ctx context.Context, userId string) ([]clothesDB, error) {
	collection := s.db.Collection("clothes")

	filter := bson.D{{Key: "user_id", Value: userId}}
	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}

	clothes := make([]clothesDB, 0)
	if err = cursor.All(ctx, &clothes); err != nil {
		return nil, err
	}

	return clothes, nil
}

func (s *ClothesStorage) Delete(ctx context.Context, id string) (int64, error) {
	collection := s.db.Collection("clothes")

	filter := bson.D{{Key: "_id", Value: id}}
	result, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		return 0, err
	}

	return result.DeletedCount, nil
}
