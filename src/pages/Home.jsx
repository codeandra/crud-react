import { useEffect, useState } from "react";
import DataTable from "../layout/DataTable";
import PostData from "../fragments/PostData";

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = "Home";
  });

  const handleAddUserClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <div className="w-[75%] mx-auto">
        <div className="p-4 relative">
          <h1 className="text-3xl font-semibold mb-2">Data Users</h1>
          <button
            onClick={handleAddUserClick}
            className={`inline-flex duration-300 ease-in-out items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            + Add User
          </button>
        </div>
        <DataTable handleAddUserClick={handleAddUserClick} />
        {showForm && <PostData setShowForm={setShowForm} />}
      </div>
    </>
  );
};

export default HomePage;
