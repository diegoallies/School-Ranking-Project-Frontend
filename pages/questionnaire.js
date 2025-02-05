import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

const Questionnaire = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Send data to the backend (e.g., POST to save questionnaire response)
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">School Questionnaire</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div>
          <label className="block">Rating for Teaching Quality</label>
          <input
            type="number"
            {...register('teachingQuality')}
            className="border p-2"
            min="1"
            max="5"
          />
        </div>

        <div className="mt-4">
          <label className="block">Rating for Safety</label>
          <input
            type="number"
            {...register('safety')}
            className="border p-2"
            min="1"
            max="5"
          />
        </div>

        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Questionnaire;
