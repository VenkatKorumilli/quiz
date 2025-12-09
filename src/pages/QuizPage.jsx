import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetAllQuestionsQuery,
  useSubmittedAnswersMutation,
  useSaveResultMutation,
} from "../services/quizApi";
import { useFormik } from "formik";

const QuizPage = () => {
  const { category } = useParams();
  const { isLoading, data } = useGetAllQuestionsQuery(category);

  const [submittedAnswers, { data: submitResult }] =
    useSubmittedAnswersMutation();

  const [saveResult] = useSaveResultMutation();
  const [next, setNext] = useState(false);

  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          quizForm.handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const quizForm = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      submittedAnswers(values);
    },
  });

  useEffect(() => {
    if (submitResult) {
      const username = localStorage.getItem("username");
      saveResult({
        username,
        score: submitResult.result,
        totalQuestions: submitResult.totalQuestions,
        category: category,
      });
    }
  }, [submitResult]);

  function nextPage() {
    setNext(true);
  }

  function prevPage() {
    setNext(false);
  }

  if (isLoading)
    return <div className="text-center mt-20 text-xl font-semibold">Loading...</div>;

  if (submitResult) {
    return (
      <>
        <div className="fixed w-full bg-[#232f3e] text-white px-3 py-3 flex justify-between items-center shadow-md z-50">

          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
            {category} Quiz
          </h1>

          <Link
            to="/"
            className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow text-sm sm:text-base"
          >
            Home
          </Link>
        </div>

        <div className="flex justify-center pt-28 px-4">
          <div className="w-full max-w-xl shadow-2xl p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Review Answers</h2>

            {data?.map((question, index) => {
              const correctAns = submitResult.correctAnswers[question.sno];
              const userAns = submitResult.submittedAnswers[question.sno];

              return (
                <div key={index} className="border p-4 rounded mb-6 shadow bg-gray-50">
                  <p className="font-semibold text-lg mb-2">
                    {index + 1}. {question.question.text}
                  </p>

                  {question.options.map((opt, idx) => {
                    let bg = "";
                    if (opt === correctAns) bg = "bg-green-200";
                    if (opt === userAns && opt !== correctAns) bg = "bg-red-200";

                    return (
                      <p key={idx} className={`p-2 rounded mt-2 ${bg}`}>
                        {opt}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  
  return (
    <>
      <div className="fixed w-full bg-[#232f3e] text-white px-3 py-3 flex justify-between items-center shadow-md">

        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
          {category} Quiz
        </h1>

        <div className="text-sm text-red-600 sm:text-base md:text-lg font-semibold mx-2">
          Time Left: {timeLeft} sec
        </div>

        <Link
          to="/"
          className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow text-sm sm:text-base"
        >
          Home
        </Link>
      </div>

      <div className="flex justify-center pt-24">
        <div className="w-full shadow-2xl max-w-xl p-4">
          <form onSubmit={quizForm.handleSubmit}>
            {!next ? (
              <ol className="list-none ml-4 space-y-6">
                {data?.slice(0, 5).map((question, i) => (
                  <li key={i}>
                    <span className="font-bold">{i + 1}. </span>
                    <span className="font-medium">{question.question.text}</span>

                    {question.options.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-2 mb-1 mt-2">
                        <input
                          type="radio"
                          name={question.sno}
                          value={opt}
                          checked={quizForm.values[question.sno] === opt}
                          onChange={quizForm.handleChange}
                        />
                        {opt}
                      </label>
                    ))}
                  </li>
                ))}

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    onClick={nextPage}
                  >
                    Next
                  </button>
                </div>
              </ol>
            ) : (
              <ol className="list-none ml-4 space-y-6">
                {data?.slice(5, 10).map((question, i) => (
                  <li key={i}>
                    <span className="font-bold">{i + 6}. </span>
                    <span className="font-medium">{question.question.text}</span>

                    {question.options.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-2 mb-1 mt-2">
                        <input
                          type="radio"
                          name={question.sno}
                          value={opt}
                          checked={quizForm.values[question.sno] === opt}
                          onChange={quizForm.handleChange}
                        />
                        {opt}
                      </label>
                    ))}
                  </li>
                ))}

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                    onClick={prevPage}
                  >
                    Previous
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </ol>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
