import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa'; // For the next button

const Questionnaire = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [questions, setQuestions] = useState({});
  const [currentStep, setCurrentStep] = useState(0); // Manage the current step in the form
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers for each question

  // Load questions from the public folder's JSON file
  useEffect(() => {
    fetch('/questionsprev.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  // Load previous answers from localStorage if available
  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('questionnaireAnswers'));
    if (savedAnswers) {
      setSelectedAnswers(savedAnswers);
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data);

    // Store answers in localStorage when form is submitted
    localStorage.setItem('questionnaireAnswers', JSON.stringify(data));

    // Send data to the backend (e.g., POST to save questionnaire response)
    // Implement the backend integration if necessary
  };

  // Rating options for each question
  const ratingOptions = [
    'Meeting Standard',
    'Compliant with Essential Requirements',
    'Moderate Compliant',
    'Borderline Compliant',
    'Diminutive Compliant',
    'Not Applicable',
  ];

  // Function to sanitize question text for use as input names
  const sanitizeInputName = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')  // Remove special characters
      .replace(/\s+/g, '_');     // Replace spaces with underscores
  };

  // Proceed to the next question
  const nextStep = () => {
    if (currentStep < Object.keys(questions).length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle selecting an answer
  const handleSelectAnswer = (question, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [question]: option,
    }));
    setValue(sanitizeInputName(question), option); // Update form state with the selected answer
  };

  return (
    <Layout>
      <div className="text-center mt-8 mb-6">
        <h1 className="text-3xl font-bold text-white">School Questionnaire</h1>
        <p className="mt-4 text-lg text-gray-400">
          Please answer the following questions to help us rate the school based on essential factors.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Render the current category */}
        {Object.keys(questions).map((category, index) => {
          if (index !== currentStep) return null; // Only show the current step

          return (
            <div key={index} className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-turquoise-500 mb-6">{category}</h2>

              <div className="space-y-6">
                {questions[category].map((question, idx) => {
                  const inputName = sanitizeInputName(question);  // Sanitize question for input name
                  return (
                    <div key={idx} className="flex flex-col">
                      <label className="text-lg font-medium text-gray-300 mb-2">{question}</label>

                      {/* Render dropdown for options */}
                      <div className="relative">
                        <select
                          {...register(inputName)}
                          value={selectedAnswers[question] || ''}
                          onChange={(e) => handleSelectAnswer(question, e.target.value)}
                          className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500"
                        >
                          <option value="" disabled selected>
                            Select an option
                          </option>
                          {ratingOptions.map((option, idx) => (
                            <option key={idx} value={option} className="bg-gray-900">
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Next Button */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center justify-center px-8 py-3 bg-turquoise-500 text-white font-semibold text-xl rounded-lg hover:bg-turquoise-600 transition-all"
                >
                  Next
                  <FaArrowRight className="ml-3" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Submit Button */}
        {currentStep === Object.keys(questions).length - 1 && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-6 shadow-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        )}
      </form>
    </Layout>
  );
};

export default Questionnaire;
