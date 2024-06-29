// src/components/ConsultationModal.jsx
import React, { useState, useEffect } from "react";

import consultation_data from "./consultation_data";
import { TfiClose } from "react-icons/tfi";

const ConsultationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [selectedImpacts, setSelectedImpacts] = useState([]);
  const [selectedAchievements, setSelectedAchievements] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
   
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timeout); 
  }, []);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal is closed
      setStep(1);
      setSelectedCategory(null);
      setSelectedConcerns([]);
      setSelectedImpacts([]);
      setSelectedAchievements([]);
      setFormData({ name: "", email: "", phone: "" });
    }
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleNext3 = () => {
    if (!selectedCategory) {
      alert("please select your primary health Problem");
    } else {
      setStep(step + 1);
    }
  };
  const handleNext4 = () => {
    if (step === 4 && selectedConcerns.length === 0) {
      alert("please select at least one health concern");
    } else {
      setStep(step + 1);
    }
  };
  const handleNext5 = () => {
    if (step === 5 && selectedImpacts.length === 0) {
      alert("please select at least one health Impact");
    } else {
      setStep(step + 1);
    }
  };
  const handleNext6 = () => {
    if (step === 6 && selectedAchievements.length === 0) {
      alert("please select at least one achievment");
    } else {
      setStep(step + 1);
    }
  };

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleMultiSelect = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allData = {
      selectedCategory,
      selectedConcerns,
      selectedImpacts,
      selectedAchievements,
      formData,
    };
    console.log("Form submitted:", allData);
    handleNext();
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="Main">
            <div className="flex ">
              <div className="left w-1/2">
                <h1>left</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur inventore natus accusamus, reiciendis beatae iusto.
                  Deserunt earum voluptate accusantium a.
                </p>
              </div>
              <div class="border-l border-gray-400 px-5"></div>
              <div className="righ w-1/2 flex flex-col gap-4 p-4">
                <h2 className="text-[#B955AA] text-lg font-bold">
                  Book a Free Consultation{" "}
                </h2>
                <h1 className="text-[#652AB6] font-bold text-[38px] leading-tight">
                  Unlock Your Path to Wellness
                </h1>
                <p className="text-gray-700 text-sm">
                  Are you ready to take the first step towards better health and
                  well-being? Our free consultation will connect you with the
                  right expert on Infano.Care.
                </p>
                <button
                  className="w-3/4 py-4 px-2 bg-[#652AB6] text-white rounded-lg"
                  onClick={handleNext}
                >
                  Start Your Free Consultation
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 gap-4">
            <h1>lets choose your answer</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam,
              magni! Dicta ipsum exercitationem illum, tempora placeat
              voluptatum dolor vero ipsa.
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 gap-4">
            {consultation_data.map((category) => (
              <div
                key={category.id}
                className={`p-4 border rounded cursor-pointer hover:bg-gray-200 ${
                  selectedCategory?.id === category.id ? "bg-gray-300" : ""
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category.category}
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded"
                onClick={handleNext3}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 gap-4">
            {selectedCategory.concerns.map((concern, index) => (
              <div
                key={index}
                className={`p-4 border rounded cursor-pointer hover:bg-gray-200 ${
                  selectedConcerns.includes(concern) ? "bg-gray-300" : ""
                }`}
                onClick={() =>
                  handleMultiSelect(
                    concern,
                    selectedConcerns,
                    setSelectedConcerns
                  )
                }
              >
                {concern}
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                className="py-2 px-4 bg-gray-500 text-white rounded"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded"
                onClick={handleNext4}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="grid grid-cols-1 gap-4">
            {selectedCategory.impact.map((impact, index) => (
              <div
                key={index}
                className={`p-4 border rounded cursor-pointer hover:bg-gray-200 ${
                  selectedImpacts.includes(impact) ? "bg-gray-300" : ""
                }`}
                onClick={() =>
                  handleMultiSelect(impact, selectedImpacts, setSelectedImpacts)
                }
              >
                {impact}
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                className="py-2 px-4 bg-gray-500 text-white rounded"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded"
                onClick={handleNext5}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-1 gap-4">
            {selectedCategory.achieve.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 border rounded cursor-pointer hover:bg-gray-200 ${
                  selectedAchievements.includes(achievement)
                    ? "bg-gray-300"
                    : ""
                }`}
                onClick={() =>
                  handleMultiSelect(
                    achievement,
                    selectedAchievements,
                    setSelectedAchievements
                  )
                }
              >
                {achievement}
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                className="py-2 px-4 bg-gray-500 text-white rounded"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded"
                onClick={handleNext6}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 7:
        return (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="p-2 border rounded"
              required={true}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="p-2 border rounded"
              required={true}
            />
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="p-2 border rounded"
              required={true}
            />
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="py-2 px-4 bg-gray-500 text-white rounded"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        );
      case 8:
        return (
          <div className="text-center">
            <p className="text-xl mb-4">Thank you for your submission!</p>
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded"
        onClick={handleOpen}
      >
        Open Consultation Modal
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-11/12 md:w-1/2 relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
              onClick={handleClose}
            >
              <TfiClose size={15} />
            </button>
            {renderStepContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationModal;
