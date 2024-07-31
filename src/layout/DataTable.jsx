import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Swal from "sweetalert2";

const DataTable = ({ handleAddUserClick }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/users");
      const result = await response.json();
      setData(result);
      setLoading(false);
    };
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const deleteData = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:8000/users/${id}`, {
          method: "DELETE",
        });
        setData(data.filter((user) => user.id !== id));
        Swal.fire("Success", "Data deleted successfully", "success");
      } else {
        Swal.fire("Failed", "Failed to delete data", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <div className="p-4">
          <div className="">
            {loading ? (
              <div className="text-center">
                <Loading />
              </div>
            ) : data.length > 0 ? (
              <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                  <tr className="border-b border-gray-200 block md:table-row">
                    <th className="block md:table-cell p-2 md:px-6 md:py-3 text-xs font-medium text-gray-500 uppercase">
                      No
                    </th>
                    <th className="block md:table-cell p-2 md:px-6 md:py-3 text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="block md:table-cell p-2 md:px-6 md:py-3 text-xs font-medium text-gray-500 uppercase">
                      Address
                    </th>
                    <th className="block md:table-cell p-2 md:px-6 md:py-3 text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group text-center">
                  {data.map((user, index) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 block md:table-row"
                    >
                      <td className="block md:table-cell p-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {index + 1}
                      </td>
                      <td className="block md:table-cell p-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-800">
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </td>
                      <td className="block md:table-cell p-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-800">
                        {user.address}
                      </td>
                      <td className="block md:table-cell space-x-3 p-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
                        <Link to={`users/${user.id}/edit`}
                          className={`inline-flex duration-300 ease-in-out items-center px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteData(user.id)}
                          className={`inline-flex duration-300 ease-in-out items-center px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">
                <p className="text-red-600 font-semibold text-2xl">
                  Empty Data
                </p>
                <button
                  onClick={handleAddUserClick}
                  className="text-blue-500 text-sm hover:underline duration-300 ease-in-out cursor-pointer"
                >
                  Please Add Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
