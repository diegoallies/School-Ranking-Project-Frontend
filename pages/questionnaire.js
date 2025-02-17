import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Questionnaire = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [questions, setQuestions] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    fetch('/questionsprev.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('questionnaireAnswers'));
    if (savedAnswers) {
      setSelectedAnswers(savedAnswers);
    }
  }, []);

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
    localStorage.setItem('questionnaireAnswers', JSON.stringify(selectedAnswers));
  };

  const ratingOptions = {
    'Meeting Standard': 5,
    'Compliant with Essential Requirements': 4,
    'Moderate Compliant': 3,
    'Borderline Compliant': 2,
    'Diminutive Compliant': 1,
    'Not Applicable': 0,
  };

  const sanitizeInputName = (text) => text.toLowerCase().replace(/[\W_]+/g, '_');

  const nextStep = () => {
    if (currentStep < Object.keys(questions).length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSelectAnswer = (category, question, option) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [category]: {
          ...prev[category],
          [question]: ratingOptions[option],
        },
      };
      localStorage.setItem('questionnaireAnswers', JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
    setValue(sanitizeInputName(question), ratingOptions[option]);
  };

  return (
    <Layout>
      <div className="text-center mt-8 mb-6">
        <h1 className="text-3xl font-bold text-white">School Questionnaire</h1>
        <p className="mt-4 text-lg text-gray-400">Answer the questions to help rate the school.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {Object.keys(questions).map((category, index) => {
          if (index !== currentStep) return null;
          return (
            <div key={index} className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-turquoise-500 mb-6">{category}</h2>

              <div className="space-y-6">
                {questions[category].map((question, idx) => {
                  const inputName = sanitizeInputName(question);
                  return (
                    <div key={idx} className="flex flex-col">
                      <label className="text-lg font-medium text-gray-300 mb-2">{question}</label>
                      <select
                        {...register(inputName)}
                        value={selectedAnswers[category]?.[question] ?? ''}
                        onChange={(e) => handleSelectAnswer(category, question, e.target.value)}
                        className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none"
                      >
                        <option value="" disabled selected>
                          Select an option
                        </option>
                        {Object.keys(ratingOptions).map((option, idx) => (
                          <option key={idx} value={option} className="bg-gray-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center justify-center px-8 py-3 bg-turquoise-500 text-white font-semibold text-xl rounded-lg hover:bg-turquoise-600"
                >
                  Next
                  <FaArrowRight className="ml-3" />
                </button>
              </div>
            </div>
          );
        })}

        {currentStep === Object.keys(questions).length - 1 && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-6 hover:bg-blue-700"
          >
            Submit
          </button>
        )}
      </form>
    </Layout>
  );
};

export default Questionnaire;
