import React, { useState } from "react";
import { Link } from "react-router-dom";

const pets = [
  {
    id: 1,
    name: "Cheerful Dog",
    breed: "Golden Retriever",
    age: 2,
    gender: "Male",
    spayedNeutered: "Yes", // Added Spayed/Neutered field
    photo:
      "./src/assets/MetavetImages/cheerful-dog-sitting-cartoon-character.a61b491abe107cb792c1.png",
  },
  {
    id: 2,
    name: "Happy Dog",
    breed: "German Shepherd",
    age: 3,
    gender: "Male",
    spayedNeutered: "No", // Added Spayed/Neutered field
    photo:
      "./src/assets/MetavetImages/happy-cartoon-dog-sitting.17b8aa903d6a5ad672ed.png",
  },
  {
    id: 3,
    name: "Happy Puppy",
    breed: "Beagle",
    age: 4,
    gender: "Male",
    spayedNeutered: "Yes", // Added Spayed/Neutered field
    photo:
      "./src/assets/MetavetImages/happy-puppy-with-heart-tag-illustration.66ff3fc60ba709b6efcf.png",
  },
  {
    id: 4,
    name: "Cute Cat",
    breed: "Persian Cat",
    age: 2,
    gender: "Female",
    spayedNeutered: "No", // Added Spayed/Neutered field
    photo: "./src/assets/MetavetImages/little-cute-cat-cartoon-character.png",
  },
  {
    id: 5,
    name: "Cheerful Dog",
    breed: "Bulldog",
    age: 3,
    gender: "Male",
    spayedNeutered: "Yes", // Added Spayed/Neutered field
    photo:
      "./src/assets/MetavetImages/cheerful-dog-sitting-cartoon-character.a61b491abe107cb792c1.png",
  },
  {
    id: 6,
    name: "Happy Puppy",
    breed: "Poodle",
    age: 4,
    gender: "Male",
    spayedNeutered: "No", // Added Spayed/Neutered field
    photo:
      "./src/assets/MetavetImages/happy-puppy-with-heart-tag-illustration.66ff3fc60ba709b6efcf.png",
  },
  {
    id: 7,
    name: "Happy Dog",
    breed: "Labrador",
    age: 2,
    gender: "Male",
    spayedNeutered: "Yes", // Added Spayed/Neutered field
    photo:
      "./src/assets/MetavetImages/happy-cartoon-dog-sitting.17b8aa903d6a5ad672ed.png",
  },
  {
    id: 8,
    name: "Cute Cat",
    breed: "Siamese",
    age: 3,
    gender: "Female",
    spayedNeutered: "No", // Added Spayed/Neutered field
    photo: "./src/assets/MetavetImages/little-cute-cat-cartoon-character.png",
  },
  {
    id: 9,
    name: "Cheerful Dog",
    breed: "Cocker Spaniel",
    age: 4,
    gender: "Male",
    spayedNeutered: "Yes", // Added Spayed/Neutered field
    photo:
      "./src/assets/MetavetImages/cheerful-dog-sitting-cartoon-character.a61b491abe107cb792c1.png",
  },
];

const MyPet = () => {
  const [petList, setPetList] = useState(pets);
  const [editingPet, setEditingPet] = useState(null);
  const [editedPetData, setEditedPetData] = useState({
    breed: "",
    age: "",
    gender: "",
    spayedNeutered: "", // Added spayedNeutered to editedPetData
  });

  // Handle editing pet
  const handleEdit = (pet) => {
    setEditingPet(pet.id);
    setEditedPetData({
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender,
      spayedNeutered: pet.spayedNeutered, // Include spayedNeutered in edited data
    });
  };

  // Handle saving edited pet
  const handleSave = () => {
    const updatedPets = petList.map((pet) =>
      pet.id === editingPet ? { ...pet, ...editedPetData } : pet
    );
    setPetList(updatedPets);
    setEditingPet(null);
  };

  // Handle canceling edit
  const handleCancel = () => {
    setEditingPet(null);
  };

  // Handle delete
  const handleDelete = (petId) => {
    const updatedPets = petList.filter((pet) => pet.id !== petId);
    setPetList(updatedPets);
  };

  return (
    <div>
      <div className="py-6 px-4">
        <Link to={"/addpet"}>
          <button className="bg-primary text-white py-2 px-4 rounded-md">
            Add Pet
          </button>
        </Link>
        <p className="text-center text-3xl font-semibold mb-6">Pet Profiles</p>

        <table className="min-w-full table-auto bg-white border-collapse shadow-lg">
          <thead>
            <tr className="border-b bg-primary">
              <th className="px-4 py-2 text-left font-semibold text-white">
                Sr.No
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Photo
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Breed
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Age
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Gender
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Spayed/Neutered
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {petList.map((pet, index) => (
              <tr key={pet.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <img
                    src={pet.photo}
                    alt={pet.name}
                    className="w-20 h-20 rounded-full"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editingPet === pet.id ? (
                    <input
                      type="text"
                      value={editedPetData.breed}
                      onChange={(e) =>
                        setEditedPetData({
                          ...editedPetData,
                          breed: e.target.value,
                        })
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    pet.breed
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editingPet === pet.id ? (
                    <input
                      type="number"
                      value={editedPetData.age}
                      onChange={(e) =>
                        setEditedPetData({
                          ...editedPetData,
                          age: e.target.value,
                        })
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    pet.age
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editingPet === pet.id ? (
                    <select
                      value={editedPetData.gender}
                      onChange={(e) =>
                        setEditedPetData({
                          ...editedPetData,
                          gender: e.target.value,
                        })
                      }
                      className="border p-1 rounded"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    pet.gender
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editingPet === pet.id ? (
                    <select
                      value={editedPetData.spayedNeutered}
                      onChange={(e) =>
                        setEditedPetData({
                          ...editedPetData,
                          spayedNeutered: e.target.value,
                        })
                      }
                      className="border p-1 rounded"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    pet.spayedNeutered
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editingPet === pet.id ? (
                    <>
                      <button
                        className="btn bg-primary text-white w-20 mr-2"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn bg-primary text-white w-20"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn bg-green-600 text-white w-20 mr-2"
                        onClick={() => handleEdit(pet)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn bg-red-600 text-white w-20"
                        onClick={() => handleDelete(pet.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPet;
