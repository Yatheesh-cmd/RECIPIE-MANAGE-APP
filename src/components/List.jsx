import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { getRecipesApi, deleteRecipeApi } from "../server/allApi";
import Edit from "./Edit";

function List({ success }) {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    getData();
  }, [success]);

  const getData = async () => {
    try {
      const result = await getRecipesApi();
      if (result.status === 200) {
        setRecipeList(result.data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const result = await deleteRecipeApi(id);
      if (result.status === 200) {
        alert("Recipe deleted successfully!");
        getData(); // Refresh list
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      {recipeList.length > 0 ? (
        <div className="row g-4">
          {recipeList.map((item) => (
            <div key={item.id} className="col-md-4">
              <Card style={{ width: "18rem" }} className="shadow">
                {/* Custom div for full-cover image */}
                <div
                  style={{
                    height: "200px",
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderTopLeftRadius: "0.375rem", // Match Bootstrap card radius
                    borderTopRightRadius: "0.375rem",
                  }}
                ></div>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    <strong>Ingredients:</strong> {item.ingredients}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Edit recipe={item} onEditSuccess={getData} />
                    <Button
                      variant="danger"
                      onClick={() => deleteRecipe(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-center">No recipes added</h3>
      )}
    </div>
  );
}

export default List;


