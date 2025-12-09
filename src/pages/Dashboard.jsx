import React from "react";
import { useGetResultQuery } from "../services/quizApi";
import { useParams, Link } from "react-router-dom";

const Dashboard = () => {
  const { id } = useParams();
  const { isLoading, data } = useGetResultQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!data?.results?.length) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        No Results Found
      </div>
    );
  }

  const username = data.results[0].username;
  const totalAttempts = data.results.length;

  return (
    <>
      <div className="w-full flex justify-between items-center bg-[#232f3e] py-4 px-6 shadow-md">
        <h1 className="text-white text-3xl font-bold">Dashboard</h1>

        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 
          text-white rounded-lg shadow-md transition"
        >
          Home
        </Link>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Hi, {username} 👋</h1>
        <p className="text-gray-600 mb-6">
          Here is your quiz performance summary.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500">
            <h2 className="text-xl font-bold">{totalAttempts}</h2>
            <p className="text-gray-600">Total Attempts</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500">
            <h2 className="text-xl font-bold">
              {data.results[0].score}/{data.results[0].totalQuestions}
            </h2>
            <p className="text-gray-600">Latest Score</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-purple-500">
            <h2 className="text-xl font-bold">{data.results[0].category}</h2>
            <p className="text-gray-600">Last Played Category</p>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Score</th>
                <th className="px-4 py-3 text-left">Total Marks</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {data.results.map((result) => {
                const d = new Date(result.date);
                const formattedDate = d.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <tr
                    key={result._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-3 font-semibold">{result.score}</td>
                    <td className="px-4 py-3">{result.totalQuestions}</td>
                    <td className="px-4 py-3 capitalize">{result.category}</td>
                    <td className="px-4 py-3">{formattedDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
