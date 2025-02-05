import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

const Questionnaire = () => {
  const { register, handleSubmit } = useForm();
  const [questions, setQuestions] = useState({});
  
  // Load questions from the public folder's JSON file
  useEffect(() => {
    fetch('/questions.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    // Send data to the backend (e.g., POST to save questionnaire response)
  };

  // Function to sanitize question text for use as input names
  const sanitizeInputName = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')  // Remove special characters
      .replace(/\s+/g, '_');     // Replace spaces with underscores
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mt-8 mb-6">School Questionnaire</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {Object.keys(questions).map((category, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{category}</h2>
            <div className="space-y-4">
              {questions[category].map((question, idx) => {
                const inputName = sanitizeInputName(question);  // Sanitize question for input name
                return (
                  <div key={idx} className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 mb-2">{question}</label>
                    <input
                      type="text"
                      {...register(inputName)}  // Register using sanitized name
                      className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-6 shadow-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Questionnaire;
