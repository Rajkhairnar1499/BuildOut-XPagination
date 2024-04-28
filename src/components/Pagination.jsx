import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./Pagination.css";

export default function Pagination() {
  const [emp, setEmp] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = res.data;
        setEmp(data);
      } catch (err) {
        console.error(err);
        alert("failed to fetch data");
      }
    };

    fetchData();
  }, []);

  // Use useMemo to optimize calculation of pages and currEmp
  // based on emp data and currPage, avoiding unnecessary recalculations
  const pages = useMemo(() => Math.ceil(emp.length / 10), [emp]);
  const startIndex = useMemo(() => (currPage - 1) * 10, [currPage]);
  const endIndex = useMemo(() => startIndex + 10, [startIndex]);
  const currEmp = useMemo(
    () => emp.slice(startIndex, endIndex),
    [emp, startIndex, endIndex]
  );

  const handleNextPage = () => {
    if (currPage < pages) {
      setCurrPage(currPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  return (
    <div className="pagination">
      <h1>Employee Data Table</h1>
      <div className="table-container">
        <div className="tables">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currEmp.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagin-container">
          <button onClick={handlePreviousPage} disabled={currPage === 1}>
            Previous
          </button>
          <p className="curr-page">{currPage}</p>
          <button onClick={handleNextPage} disabled={currPage === pages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
