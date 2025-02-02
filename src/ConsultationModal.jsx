// src/components/ConsultationModal.jsx
import React, { useState, useEffect } from "react";
import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import consultation_data from "./consultation_data";
import { TfiClose } from "react-icons/tfi";
import { RiCloseCircleFill } from "react-icons/ri";

const ConsultationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [selectedImpacts, setSelectedImpacts] = useState([]);
  const [selectedAchievements, setSelectedAchievements] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    comment: "",
  });

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
      setFormData({ name: "", phone: "", email: "", age: "", comment: "" });
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
          <div className="Main ">
            <div className="flex ">
              <div className="left w-1/2 ">
                <img
                  src="/elements/doctor.png"
                  alt="banner"
                  className=" w-[380px] "
                />
              </div>
              <div class="flex border-l border-gray-400 px-5 h-[400px] my-auto"></div>
              <div className="righ w-1/2 flex flex-col gap-6 justify-center mx-10">
                <h2 className="text-[#B955AA] text-[22px] font-bold">
                  Book a Free Consultation{" "}
                </h2>
                <h1 className="text-[#652AB6] font-extrabold text-[47.6px] leading-tight">
                  Unlock Your Path to Wellness
                </h1>
                <p className="text-gray-700 text-[14px]">
                  Are you ready to take the first step towards better health and
                  well-being? Our free consultation will connect you with the
                  right expert on Infano.Care.
                </p>
                <button
                  className="w-3/4 py-4 px-2 bg-[#652AB6] text-white rounded-lg text-lg"
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
          <div className="m-10 flex flex-col gap-8 p-10">
            <h1 className="text-[35px] font-extrabold text-[#652AB6] ">
              Welcome to Infano.Care
            </h1>
            <p className="text-[18px] leading-8  ">
              We're thrilled you're here! To provide you with the best possible
              experience, we need to learn a bit more about you. This short
              questionnaire will help us understand your specific needs and
              match you with the perfect expert.
            </p>
            <div className="flex items-center justify-between mt-10">
              {" "}
              <p>92% People Feel Healthier With A Holistic Health Approach</p>
              <button
                className="py-2 px-8 bg-[#652AB6] text-white rounded-lg text-lg"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-10 p-20 ">
            <h1 className="text-[35px] font-extrabold text-[#652AB6]">
              What aspect of your health would you like to discuss during this
              consultation?
            </h1>
            <div className="w-[50%] grid grid-cols-2 gap-2 ">
              {consultation_data.map((category) => (
                <div
                  key={category.id}
                  className={`border p-4 rounded-full text-center cursor-pointer shadow-md transition-all ease-out${
                    selectedCategory?.id === category.id
                      ? " bg-[#B955AA]  text-white"
                      : " border-[#B955AA]"
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.category}
                </div>
              ))}
            </div>

            <button
              className="absolute bottom-8 right-8 py-2 px-8 bg-[#652AB6] text-white rounded-lg text-lg  "
              onClick={handleNext3}
            >
              Next
            </button>
          </div>
        );
      case 4:
        return (
          <div className="p-20">
            <h1 className="text-[35px] font-extrabold text-[#652AB6] mb-5 leading-tight">
              What specific concerns related to{" "}
              {selectedCategory && selectedCategory.category} are you currently
              experiencing?
            </h1>
            <div className="grid grid-cols-3 gap-5 mb-10 ">
              {selectedCategory.concerns.map((concern, index) => (
                <div
                  key={index}
                  className={`border py-2 rounded-full font-normal text-center text-sm cursor-pointer shadow-sm transition-all ease-out ${
                    selectedConcerns.includes(concern)
                      ? "bg-[#B955AA]  text-white"
                      : "border-[#B955AA]"
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
            </div>
            <div className="flex justify-between">
              {" "}
              <button
                className=" py-2 px-4 bg-[#652AB6] text-white rounded-lg text-lg"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className=" py-2 px-8 bg-[#652AB6] text-white rounded-lg text-lg"
                onClick={handleNext4}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="p-20">
            <h1 className="text-[35px] font-extrabold text-[#652AB6] mb-5 leading-tight">
              How are these concerns impacting your daily life?
            </h1>
            <div className="grid grid-cols-3 gap-5 mb-10 ">
              {selectedCategory.impact.map((impact, index) => (
                <div
                  key={index}
                  className={`border py-2 rounded-full font-normal text-center text-sm cursor-pointer shadow-sm transition-all ease-out ${
                    selectedImpacts.includes(impact)
                      ? "bg-[#B955AA]  text-white"
                      : "border-[#B955AA]"
                  }`}
                  onClick={() =>
                    handleMultiSelect(
                      impact,
                      selectedImpacts,
                      setSelectedImpacts
                    )
                  }
                >
                  {impact}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {" "}
              <button
                className=" py-2 px-4 bg-[#652AB6] text-white rounded-lg text-lg"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className=" py-2 px-8 bg-[#652AB6] text-white rounded-lg text-lg"
                onClick={handleNext4}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="p-20">
            <h1 className="text-[35px] font-extrabold text-[#652AB6] mb-5 leading-tight">
              What are you hoping to achieve through this consultation?
            </h1>
            <div className="grid grid-cols-3 gap-5 mb-10 ">
              {selectedCategory.achieve.map((achievement, index) => (
                <div
                  key={index}
                  className={`border py-2 rounded-full font-normal text-center text-sm cursor-pointer shadow-sm transition-all ease-out ${
                    selectedAchievements.includes(achievement)
                      ? "bg-[#B955AA]  text-white"
                      : "border-[#B955AA]"
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
            </div>
            <div className="flex justify-between">
              {" "}
              <button
                className=" py-2 px-4 bg-[#652AB6] text-white rounded-lg text-lg"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className=" py-2 px-8 bg-[#652AB6] text-white rounded-lg text-lg"
                onClick={handleNext4}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 7:
        return (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="email4" value="Your email" />
              </div>
              <TextInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                rightIcon={HiMail}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="email4" value="Your email" />
              </div>
              <TextInput
                type="email"
                rightIcon={HiMail}
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="email4" value="Your email" />
              </div>
              <TextInput
                type="email"
                rightIcon={HiMail}
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="email4" value="Your email" />
              </div>
              <TextInput
                type="email"
                rightIcon={HiMail}
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="email4" value="Your email" />
              </div>
              <TextInput
                type="email"
                rightIcon={HiMail}
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="p-2 border rounded"
              required={true}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="p-2 border rounded"
              required={true}
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter Your Age"
              className="p-2 border rounded"
              required={true}
            />
            <input
              type="text"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Any specific comment you want to add"
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
        <div className="fixed inset-0 bg-[#652AB6] bg-opacity-30 flex items-center justify-center   ">
          <div className="bg-[#f6edf1]  rounded-2xl shadow-lg  relative w-[950px]    ">
            <button
              className="absolute top-6 right-6 text-gray-700 hover:text-gray-900"
              onClick={handleClose}
            >
              <RiCloseCircleFill
                size={30}
                className="hover:text-purple-600   text-[#652AB6]"
              />
            </button>
            {renderStepContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationModal;
