import { useEffect, useState } from "react";
import Input from "../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const PostData = ({ setShowForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    gender: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/users");
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const newID = (
        data.length > 0
          ? Math.max(...data.map((user) => Number(user.id))) + 1
          : 1
      ).toString();
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newID,
          ...formData,
          created_at: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      console.log(result);

      setFormData({
        id: null,
        name: "",
        age: "",
        address: "",
        gender: "",
        created_at: "",
      });

      setShowForm(false);
      Swal.fire("Success", "Data added successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to add data", "error");
    }
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center duration-300 ease-in-out">
      <div className="flex justify-center w-full">
        <div className="bg-white p-10 rounded-2xl w-[400px] relative">
          <h1 className="mb-6 text-2xl font-semibold">Post Data</h1>
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Name"
              type="text"
              name="name"
              placeholder="Your Name..."
              value={formData.name}
              oc={handleChange}
            />
            <Input
              label="Age"
              type="number"
              name="age"
              placeholder="Your Age..."
              value={formData.age}
              oc={handleChange}
            />
            <Input
              label="Address"
              type="text"
              name="address"
              placeholder="Your Address..."
              value={formData.address}
              oc={handleChange}
            />
            <div className="max-w-full space-y-1">
              <label className="font-semibold text-slate-600">Gender</label>
              <select
                name="gender"
                onChange={handleChange} required
                class="py-2 px-4 pe-9 block w-full bg-slate-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600"
              >
                <option selected value={""}>Select Your Gender</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Custom"}>Custom</option>
              </select>
            </div>
            <button
              className={`inline-flex duration-300 ease-in-out items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostData;
