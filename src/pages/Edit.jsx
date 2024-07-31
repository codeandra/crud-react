import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const EditPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  document.title = `Edit - ${data.id}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/users/${id}`);
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will change your data, previous data cannot be restored",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:8000/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`Data Updated! Result: ${result}`);
          Swal.fire("Success", "Data updated successfully", "success");
        } else {
          throw new Error("Failed to update data");
        }

        navigate("/");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Failed", "Failed to update data", "error");
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen items-center">
      <div className="bg-white p-10 rounded-2xl w-[400px] shadow-2xl">
        <Link to="/" className="mb-6 text-2xl font-semibold">
          <span className="me-3">
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
          Edit Data
        </Link>
        <form onSubmit={handleUpdate} className="space-y-5 mt-8">
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Your Name..."
            value={data.name}
            oc={handleChange}
          />
          <Input
            label="Age"
            type="number"
            name="age"
            placeholder="Your Age..."
            value={data.age}
            oc={handleChange}
          />
          <Input
            label="Address"
            type="text"
            name="address"
            placeholder="Your Address..."
            value={data.address}
            oc={handleChange}
          />
          <div className="max-w-full space-y-1">
            <label className="font-semibold text-slate-600">Gender</label>
            <select
              name="gender"
              required
              value={data.gender}
              onChange={handleChange}
              className="py-2 px-4 pe-9 block w-full bg-slate-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600"
            >
              <option value="" disabled>
                Select Your Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex duration-300 ease-in-out items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
