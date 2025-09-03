import React, { useState } from "react";

const AddPet = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState(""); // State for gender
  const [spayedOrNeutered, setSpayedOrNeutered] = useState(""); // State for spayed/neutered

  const handleSpeciesChange = (event) => {
    setSpecies(event.target.value);
    setBreed("");
  };

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setError("");
      } else {
        setError("Please upload a valid image file (jpg, jpeg, png).");
        setFile(null);
        setPreview("");
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    console.log("Uploading file:", file);
    setUploadMessage(`Uploaded: ${file.name}`);

    setFile(null);
    setPreview("");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.target.classList.add("drag-over");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.target.classList.remove("drag-over");

    const selectedFile = event.dataTransfer.files[0];
    handleFileChange(selectedFile);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.target.classList.remove("drag-over");
  };

  const dogBreeds = [
    "Labrador Retriever",
    "Golden Retriever",
    "German Shepherd",
    "Beagle",
    "Bulldog (English, French)",
    "Poodle (Standard, Miniature, Toy)",
    "Boxer",
    "Dachshund",
    "Siberian Husky",
    "Yorkshire Terrier",
    "Shih Tzu",
    "Cocker Spaniel",
    "Border Collie",
    "Australian Shepherd",
    "Pug",
    "Rottweiler (restricted in some areas)",
    "Chihuahua",
    "Doberman Pinscher (restricted in some areas)",
    "Cavalier King Charles Spaniel",
    "Great Dane",
    "Maltese",
    "Schnauzer (Miniature, Standard, Giant)",
    "Basset Hound",
    "Bernese Mountain Dog",
    "Vizsla",
    "Collie",
    "Weimaraner",
    "Newfoundland",
    "Boston Terrier",
    "Samoyed",
    "Mixed Breeds",
    "Mastiff",
    "Cane Corso",
    "American Bulldog",
  ];

  const catBreeds = [
    "Domestic Shorthair",
    "Domestic Longhair",
    "Abyssinian",
    "American Shorthair",
    "Siamese",
    "Persian",
    "Maine Coon",
    "Ragdoll",
    "Bengal",
    "Sphynx",
    "British Shorthair",
    "Scottish Fold",
    "Birman",
    "Norwegian Forest Cat",
    "Russian Blue",
    "Devon Rex",
    "Oriental Shorthair",
    "Himalayan",
    "Manx",
    "Tonkinese",
    "Mixed Breed",
  ];

  const speciesOptions = [
    "Dog",
    "Cat",
    "Bird",
    "Small Mammals",
    "Fish",
    "Reptiles",
    "Amphibians",
    "Exotics",
    "Horses & Large Animals",
    "Rodents",
    "Insects/Arachnids",
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Upload Pet Image</h2>

        {/* Image Upload Section */}
        <div className=" mb-6">
          <div
            className=" border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer relative "
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept="image/*"
              id="file-input"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden"
            />
            <label
              htmlFor="file-input"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-gray-600">
                Drag and drop an image here or click to upload
              </span>
            </label>
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Image preview"
                  className="w-40 h-40 object-cover rounded-full mx-auto"
                />
              </div>
            )}
          </div>

          {file && (
            <div className="text-center mt-2">
              <p>Selected file: {file.name}</p>
              <button
                className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          )}

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {uploadMessage && (
            <p className="text-green-500 text-center mt-2">{uploadMessage}</p>
          )}
        </div>

        {/* Pet Details Form */}
        <h2 className="text-2xl font-semibold mb-4">Pet Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="petName"
              className="block text-gray-600 font-semibold mb-2"
            >
              Name of your Pet
            </label>
            <input
              type="text"
              id="petName"
              placeholder="Enter pet name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="species"
              className="block text-gray-600 font-semibold mb-2"
            >
              Pet Species
            </label>
            <select
              id="species"
              value={species}
              onChange={handleSpeciesChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Select Species--</option>
              {speciesOptions.map((speciesOption, index) => (
                <option key={index} value={speciesOption.toLowerCase()}>
                  {speciesOption}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="breed"
              className="block text-gray-600 font-semibold mb-2"
            >
              Pet Breed
            </label>
            <select
              id="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!species}
            >
              <option value="">--Select Breed--</option>
              {species === "dog" &&
                dogBreeds.map((dogBreed, index) => (
                  <option key={index} value={dogBreed}>
                    {dogBreed}
                  </option>
                ))}
              {species === "cat" &&
                catBreeds.map((catBreed, index) => (
                  <option key={index} value={catBreed}>
                    {catBreed}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="petAge"
              className="block text-gray-600 font-semibold mb-2"
            >
              Pet Age
            </label>
            <input
              type="number"
              id="petAge"
              placeholder="Enter pet age"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender and Spayed/Neutered Inputs (Repositioned) */}
          <div>
            <label
              htmlFor="petWeight"
              className="block text-gray-600 font-semibold mb-2"
            >
              Pet Weight (kg)
            </label>
            <input
              type="number"
              id="petWeight"
              placeholder="Enter pet weight"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Pet Gender
            </label>
            <div className="flex gap-6">
              <label>
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="mr-2"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Spayed or Neutered
            </label>
            <div className="flex gap-6">
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={spayedOrNeutered === "yes"}
                  onChange={() => setSpayedOrNeutered("yes")}
                  className="mr-2"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="no"
                  checked={spayedOrNeutered === "no"}
                  onChange={() => setSpayedOrNeutered("no")}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="petHeight"
              className="block text-gray-600 font-semibold mb-2"
            >
              Pet Height
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Feet"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Inches"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="col-span-2 text-center mt-6">
            <button className="bg-primary text-white py-2 px-6 rounded-md">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPet;

// import React, { useState } from "react";

// const AddPet = () => {
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState("");
//   const [preview, setPreview] = useState("");
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [species, setSpecies] = useState("");
//   const [breed, setBreed] = useState("");
//   const [gender, setGender] = useState(""); // State for gender
//   const [spayedOrNeutered, setSpayedOrNeutered] = useState(""); // State for spayed/neutered

//   const handleSpeciesChange = (event) => {
//     setSpecies(event.target.value);
//     setBreed("");
//   };

//   const handleFileChange = (selectedFile) => {
//     if (selectedFile) {
//       const validTypes = ["image/jpeg", "image/png", "image/jpg"];
//       if (validTypes.includes(selectedFile.type)) {
//         setFile(selectedFile);
//         setPreview(URL.createObjectURL(selectedFile));
//         setError("");
//       } else {
//         setError("Please upload a valid image file (jpg, jpeg, png).");
//         setFile(null);
//         setPreview("");
//       }
//     }
//   };

//   const handleUpload = () => {
//     if (!file) {
//       setError("No file selected.");
//       return;
//     }

//     console.log("Uploading file:", file);
//     setUploadMessage(`Uploaded: ${file.name}`);

//     setFile(null);
//     setPreview("");
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     event.target.classList.add("drag-over");
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     event.target.classList.remove("drag-over");

//     const selectedFile = event.dataTransfer.files[0];
//     handleFileChange(selectedFile);
//   };

//   const handleDragLeave = (event) => {
//     event.preventDefault();
//     event.target.classList.remove("drag-over");
//   };

//   const dogBreeds = [
//     "Labrador Retriever",
//     "Golden Retriever",
//     "German Shepherd",
//     "Beagle",
//     "Bulldog (English, French)",
//     "Poodle (Standard, Miniature, Toy)",
//     "Boxer",
//     "Dachshund",
//     "Siberian Husky",
//     "Yorkshire Terrier",
//     "Shih Tzu",
//     "Cocker Spaniel",
//     "Border Collie",
//     "Australian Shepherd",
//     "Pug",
//     "Rottweiler (restricted in some areas)",
//     "Chihuahua",
//     "Doberman Pinscher (restricted in some areas)",
//     "Cavalier King Charles Spaniel",
//     "Great Dane",
//     "Maltese",
//     "Schnauzer (Miniature, Standard, Giant)",
//     "Basset Hound",
//     "Bernese Mountain Dog",
//     "Vizsla",
//     "Collie",
//     "Weimaraner",
//     "Newfoundland",
//     "Boston Terrier",
//     "Samoyed",
//     "Mixed Breeds",
//     "Mastiff",
//     "Cane Corso",
//     "American Bulldog",
//   ];

//   const catBreeds = [
//     "Domestic Shorthair",
//     "Domestic Longhair",
//     "Abyssinian",
//     "American Shorthair",
//     "Siamese",
//     "Persian",
//     "Maine Coon",
//     "Ragdoll",
//     "Bengal",
//     "Sphynx",
//     "British Shorthair",
//     "Scottish Fold",
//     "Birman",
//     "Norwegian Forest Cat",
//     "Russian Blue",
//     "Devon Rex",
//     "Oriental Shorthair",
//     "Himalayan",
//     "Manx",
//     "Tonkinese",
//     "Mixed Breed",
//   ];

//   const speciesOptions = [
//     "Dog",
//     "Cat",
//     "Bird",
//     "Small Mammals",
//     "Fish",
//     "Reptiles",
//     "Amphibians",
//     "Exotics",
//     "Horses & Large Animals",
//     "Rodents",
//     "Insects/Arachnids",
//   ];

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Upload Pet Image</h2>

//         {/* Image Upload Section */}
//         <div className="mb-6">
//           <div
//             className="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer relative"
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}
//             onDragLeave={handleDragLeave}
//           >
//             <input
//               type="file"
//               accept="image/*"
//               id="file-input"
//               onChange={(e) => handleFileChange(e.target.files[0])}
//               className="hidden"
//             />
//             <label
//               htmlFor="file-input"
//               className="absolute inset-0 flex items-center justify-center"
//             >
//               <span className="text-gray-600">
//                 Drag and drop an image here or click to upload
//               </span>
//             </label>
//             {preview && (
//               <div className="mt-4">
//                 <img
//                   src={preview}
//                   alt="Image preview"
//                   className="w-40 h-40 object-cover rounded-full mx-auto"
//                 />
//               </div>
//             )}
//           </div>

//           {file && (
//             <div className="text-center mt-2">
//               <p>Selected file: {file.name}</p>
//               <button
//                 className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg"
//                 onClick={handleUpload}
//               >
//                 Upload
//               </button>
//             </div>
//           )}

//           {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//           {uploadMessage && (
//             <p className="text-green-500 text-center mt-2">{uploadMessage}</p>
//           )}
//         </div>

//         {/* Pet Details Form */}
//         <h2 className="text-2xl font-semibold mb-4">Pet Details</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label
//               htmlFor="petName"
//               className="block text-gray-600 font-semibold mb-2"
//             >
//               Name of your Pet
//             </label>
//             <input
//               type="text"
//               id="petName"
//               placeholder="Enter pet name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="species"
//               className="block text-gray-600 font-semibold mb-2"
//             >
//               Pet Species
//             </label>
//             <select
//               id="species"
//               value={species}
//               onChange={handleSpeciesChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">--Select Species--</option>
//               {speciesOptions.map((speciesOption, index) => (
//                 <option key={index} value={speciesOption.toLowerCase()}>
//                   {speciesOption}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label
//               htmlFor="breed"
//               className="block text-gray-600 font-semibold mb-2"
//             >
//               Pet Breed
//             </label>
//             <select
//               id="breed"
//               value={breed}
//               onChange={(e) => setBreed(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={!species}
//             >
//               <option value="">--Select Breed--</option>
//               {species === "dog" &&
//                 dogBreeds.map((dogBreed, index) => (
//                   <option key={index} value={dogBreed}>
//                     {dogBreed}
//                   </option>
//                 ))}
//               {species === "cat" &&
//                 catBreeds.map((catBreed, index) => (
//                   <option key={index} value={catBreed}>
//                     {catBreed}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           <div>
//             <label
//               htmlFor="petAge"
//               className="block text-gray-600 font-semibold mb-2"
//             >
//               Pet Age
//             </label>
//             <input
//               type="number"
//               id="petAge"
//               placeholder="Enter pet age"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="petWeight"
//               className="block text-gray-600 font-semibold mb-2"
//             >
//               Pet Weight (kg)
//             </label>
//             <input
//               type="number"
//               id="petWeight"
//               placeholder="Enter pet weight"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="petHeight"
//               className="block text-gray-600 font-semibold mb-2"
//             >
//               Pet Height
//             </label>
//             <div className="flex gap-4">
//               <input
//                 type="number"
//                 placeholder="Feet"
//                 className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="number"
//                 placeholder="Inches"
//                 className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Gender and Spayed/Neutered Inputs */}
//           <div className="col-span-2">
//             <label className="block text-gray-600 font-semibold mb-2">
//               Pet Gender
//             </label>
//             <div className="flex gap-6">
//               <label>
//                 <input
//                   type="radio"
//                   value="male"
//                   checked={gender === "male"}
//                   onChange={() => setGender("male")}
//                 />
//                 Male
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="female"
//                   checked={gender === "female"}
//                   onChange={() => setGender("female")}
//                 />
//                 Female
//               </label>
//             </div>
//           </div>

//           <div className="col-span-2">
//             <label className="block text-gray-600 font-semibold mb-2">
//               Spayed or Neutered
//             </label>
//             <div className="flex gap-6">
//               <label>
//                 <input
//                   type="radio"
//                   value="yes"
//                   checked={spayedOrNeutered === "yes"}
//                   onChange={() => setSpayedOrNeutered("yes")}
//                 />
//                 Yes
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="no"
//                   checked={spayedOrNeutered === "no"}
//                   onChange={() => setSpayedOrNeutered("no")}
//                 />
//                 No
//               </label>
//             </div>
//           </div>

//           <div className="col-span-2 text-center mt-6">
//             <button className="bg-primary text-white py-2 px-6 rounded-md">
//               Create
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddPet;
