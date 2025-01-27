import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addRecipeApi } from "../server/allApi";

function Add({ val }) {
  const [show, setShow] = useState(false);
  const [recipe, setRecipe] = useState({ title: "", ingredients: "", image: "" });

  const handleSubmit = async () => {
    const { title, ingredients, image } = recipe;
    if (!title || !ingredients || !image) {
      alert("Enter valid inputs!");
    } else {
      try {
        const result = await addRecipeApi(recipe);
        if (result.status === 201) {
          alert("Recipe added!");
          handleClose();
          setRecipe({ title: "", ingredients: "", image: "" });
          val(result.data); 
        }
      } catch (error) {
        console.error("Error adding recipe:", error);
        alert("Adding failed. Please try again!");
      }
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn b1 mb-5 mt-5 border" onClick={handleShow}>
        Add New Recipe 🍝+
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              type="text"
              onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
              placeholder="Enter Recipe Title"
              className="form-control mb-3"
            />
            <textarea
              onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
              placeholder="Enter Ingredients"
              className="form-control mb-3"
            />
            <input
              type="text"
              onChange={(e) => setRecipe({ ...recipe, image: e.target.value })}
              placeholder="Enter Image URL"
              className="form-control mb-3"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
