import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { updateRecipeApi } from "../server/allApi";

function Edit({ recipe, onEditSuccess }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(recipe); 

  const updateRecipe = async () => {
    const { title, ingredients, image } = data;
    if (!title || !ingredients || !image) {
      alert("Enter valid inputs!"); 
    } else {
      const result = await updateRecipeApi(recipe.id, data); 
      if (result.status === 200) {
        alert("Recipe details updated!"); 
        handleClose();
        onEditSuccess(); 
      } else {
        alert("Failed to update recipe. Please try again."); 
      }
    }
  };

  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-warning me-4" onClick={handleShow}>
        Edit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={data.title}
            className="form-control mb-3"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Enter Recipe Title"
          />
          <input
            type="text"
            value={data.ingredients}
            className="form-control mb-3"
            onChange={(e) => setData({ ...data, ingredients: e.target.value })}
            placeholder="Enter Ingredients"
          />
          <input
            type="text"
            value={data.image}
            className="form-control mb-3"
            onChange={(e) => setData({ ...data, image: e.target.value })}
            placeholder="Enter Image URL"
          />
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button variant="primary" onClick={updateRecipe}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;


