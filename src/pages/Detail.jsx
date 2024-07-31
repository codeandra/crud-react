import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../fragments/CardDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";

const DetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  document.title = `Detail - ${data.name}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/users/${id}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="mx-auto min-h-screen flex justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="p-4">
          <h1 className="text-3xl font-semibold mb-5">
            <Link to="/" className="me-2">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            Detail Users
          </h1>
          <Card
            name={data.name}
            age={data.age}
            address={data.address}
            gender={data.gender}
            created_at={formatDate(data.created_at)}
          />
        </div>
      )}
    </div>
  );
};

export default DetailPage;
