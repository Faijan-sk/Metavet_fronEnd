import React, { useState, useEffect } from "react";
import { Plus, X, IndianRupee, Clock, AlignLeft, DollarSign } from "lucide-react";
import useJwt from "../../../../enpoints/jwt/useJwt"; 

const GroomingServiceForm = ({ onClose, onCreated, initialValues = null }) => {
  const [servicesList, setServicesList] = useState([]);
  
  const [currentService, setCurrentService] = useState({
    serviceName: "",
    durationMinutes: "",
    price: "",
    description: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
const[metavetFess, setMetavetFees] = useState(false)
    const [metavetChargesDetail, setMetavetChargesDetail] = useState({})

  useEffect(() => {
    if (initialValues && Array.isArray(initialValues)) {
      setServicesList(initialValues);
    }
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: value }));
  };

  const addService = () => {
    setError(null);
    const { serviceName, durationMinutes, price } = currentService;

    if (!serviceName || !durationMinutes || !price) {
      return setError("Please fill Service Name, Duration and Price.");
    }

    if (servicesList.some((s) => s.serviceName.toUpperCase() === serviceName.toUpperCase())) {
      return setError(`${serviceName} is already added.`);
    }

    setServicesList((prev) => [...prev, {
      ...currentService,
      durationMinutes: Number(durationMinutes),
      price: Number(price)
    }]);

    setCurrentService({ serviceName: "", durationMinutes: "", price: "", description: "" });
  };

  const removeService = (index) => {
    setServicesList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (servicesList.length === 0) {
      return setError("Please add at least one service.");
    }

    setLoading(true);
    setError(null);

    try {
      // API call using the service you provided
      // servicesList is already in the format: [{serviceName, durationMinutes, price, description}, ...]
      const response = await useJwt.createServices(servicesList); 
      
      // Success: Call parent callbacks
      if (onCreated) onCreated(response.data || servicesList);
      if (onClose) onClose();
      
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.message || "Failed to save services. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(()=>{
  
  const fetchCharges = async ()=>{
    
    const response =await useJwt.getMetavetCharges("Pet_Groomer");
    
    console.log('mmmmmmmmmmmmmmmmmmmmm',response.data);
setMetavetChargesDetail(response.data.data);
  }

  fetchCharges()
},[metavetFess])


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Input Selection Area */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
        <label className="block text-sm font-bold text-gray-700 mb-2 text-center uppercase tracking-wider">
          Add New Grooming Service
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="serviceName"
            placeholder="Service Name (e.g. FULL_GROOM)"
            value={currentService.serviceName}
            onChange={handleInputChange}
            className="px-4 py-3 bg-white border-2 border-gray-100 rounded-lg outline-[#52B2AD]"
          />
          <div className="relative">
            <Clock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="number"
              name="durationMinutes"
              placeholder="Duration (Mins)"
              value={currentService.durationMinutes}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-lg outline-[#52B2AD]"
            />
          </div>
          <div className="relative">
             <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={18} />
             <input
              type="number"
              name="price"
              placeholder="Price"
              value={currentService.price}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-lg outline-[#52B2AD]"
            />
          </div>
          <div className="relative">
            <AlignLeft className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              name="description"
              placeholder="Description"
              value={currentService.description}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-lg outline-[#52B2AD]"
            />
          </div>
        </div>


{metavetFess === false ? (
  <p className="text-sm">
    View Metavet fee structure{" "}
    <span
      className="text-yellow-600 font-medium cursor-pointer"
      onClick={() => setMetavetFees(true)}
    >
      view
    </span>
  </p>
) : (
  <p className="text-sm">
    Please note: Metavet will charge the client an additional <span className="text-primary font-bold">{metavetChargesDetail.feesValue} {metavetChargesDetail.feesType}</span> on the fee you
    enter.
    <span
      className="text-yellow-600 font-medium cursor-pointer ml-1"
      onClick={() => setMetavetFees(false)}
    >
      hide
    </span>
  </p>
)}


        <button 
          type="button" 
          onClick={addService} 
          className="w-full py-3 bg-[#52B2AD] text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-[#42948f] transition-colors"
        >
          <Plus size={20} /> Add to Service List
        </button>
      </div>

      {/* Services List Area */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {servicesList.map((service, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-gray-100 rounded-xl items-center shadow-sm">
            <div className="flex-1 w-full">
               <div className="font-bold text-[#52B2AD] text-lg">{service.serviceName}</div>
               <div className="text-xs text-gray-400 font-medium">{service.description || "No description provided"}</div>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full border text-sm text-gray-600">
                <Clock size={14} /> {service.durationMinutes}m
              </div>
              <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full border border-green-100 text-sm font-bold text-green-600">
                ${service.price}
              </div>
              <button type="button" onClick={() => removeService(i)} className="text-red-400 hover:text-red-600 p-1">
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
        
        {servicesList.length === 0 && (
          <p className="text-center text-gray-400 py-6 italic border-2 border-dashed border-gray-50 rounded-xl">
            No services added yet.
          </p>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t mt-6">
        <button 
          type="button" 
          onClick={onClose} 
          className="px-6 py-2.5 text-gray-500 font-bold hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading || servicesList.length === 0} 
          className="px-10 py-2.5 bg-gradient-to-r from-[#52B2AD] to-[#42948f] text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save All Services"}
        </button>
      </div>
    </form>
  );
};

export default GroomingServiceForm;