import React, { useState, useEffect } from "react";
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
              <div className="card text-light bg-dark shadow">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    <strong>Ingredients:</strong> {item.ingredients}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Edit recipe={item} onEditSuccess={getData} />
                    <button
                      onClick={() => deleteRecipe(item.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
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
