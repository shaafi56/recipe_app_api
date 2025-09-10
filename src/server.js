import express from 'express';
import { ENV } from './config/env.js';
import { db } from './config/db.js';
import { favoritesTable } from './db/schema.js';
import { eq, and } from 'drizzle-orm';

const app = express();
const PORT = ENV.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON request bodies if not exists the body was undefined 

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true});
});

// Handle POST request for adding a favorite recipe 
app.post('/api/favorites', async (req, res) => { // Handle POST request for adding a favorite recipe 

  try {
    const { userId, recipeId, title, image, cookTime, severings } = req.body; // Destructure the request body 

    if(!userId || !recipeId || !title) { // Check if the required fields are present
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Insert the favorite recipe into the database
    const newFavorite = await db.insert(favoritesTable).values({ userId, recipeId, title, image, cookTime, severings }).returning( );
    res.status(201).json(newFavorite[0]);

  } catch (error) {
    console.log("Error adding a favorite recipe: ", error);
    res.status(500).json({ error: error.message });
  }
});

// Handle GET request for getting all favorites recipes of a user 
app.get('/api/favorites/:userId', async (req, res) => { 

  try {
    const { userId } = req.params; // Destructure the request parameters 
    const userFavorites = await db.select().from(favoritesTable).where(eq(favoritesTable.userId, userId));
    res.status(200).json(userFavorites)
  } catch (error) {
    console.log("Error fetching the favorites ", error);
    res.status(500).json({ error: error.message }); 
  }
});

// Handle DELETE request for removing a favorite recipe 
app.delete('/api/favorites/:userId/:recipeId', async (req, res) => { // Handle DELETE request for removing a favorite recipe 

  try {
    const { userId, recipeId } = req.params; // Destructure the request parameters 
    await db.delete(favoritesTable).where(and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, parseInt(recipeId)))); // Delete the favorite recipe from the database
    res.status(200).json({ message: "Favorite recipe removed successfully" });
  } catch (error) {
    console.log("Error removing a foverites recipe: ", error);
    res.status(500).json({ error: error.message });
  }
});



app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});