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
    <>
      {recipeList.length > 0 ? (
        <table className="table table-bordered border-5 shadow border-light text-light">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Ingredients</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipeList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.ingredients}</td>
                <td>
                  <img src={item.image} height="200px" width="290px" alt={item.title} />
                </td>
                <td>
                  <Edit recipe={item} onEditSuccess={getData} />
                  <button onClick={() => deleteRecipe(item.id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No recipes added</h3>
      )}
    </>
  );
}

export default List;

