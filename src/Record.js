import React, { useEffect, useState } from "react";
import ReactSearchBox from "react-search-box";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Record.css";

function Record() {
  const [arr, setArr] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResulted] = useState([]);
  const [stat, setStat] = useState(true);
  
  const [record, setRecord] = useState({
    id: "",
    f_name: "",
    l_name: "",
    s_name: "",
    email: "",
    gender: "",
    age: "",
  });
  console.log(arr);

  useEffect(() => {
    var key = localStorage.getItem("users");
    if (key) {
      var get = JSON.parse(localStorage.getItem("users"));
      setArr(get);
    }
  }, []);

  useEffect(() => {
    if (!stat) {
      localStorage.setItem("users", JSON.stringify(arr));
    } else {
      setStat(false);
    }
  }, [arr, stat]);

  useEffect(() => {
    const timer = setTimeout(() => searchItems(searchInput), 100);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleChange = (e) => {
   
    // var letters = /^[A-Za-z]+$/;
    setRecord({
      ...record,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setArr([...arr, record]);
    localStorage.setItem("users", JSON.stringify([...arr, record]));
  };

  const handleSearch = (event) => {
    console.log(event)
    setSearchInput(event);
  };

  const searchItems = (searchValue) => {
    console.log(searchValue)
    setSearchInput(searchValue);
    if (searchValue) {
      const filteredData = arr.filter((item) => {
        const search =searchValue.toLowerCase()
        return (
          item.f_name.toLowerCase().includes(search) ||
          item.l_name.toLowerCase().includes(search) ||
          item.s_name.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search) ||
          item.age.toLowerCase().includes(search)
        );
      });
      setFilteredResulted(filteredData);
    }
  };

  const handleCheck = (e, data) => {
    console.log(e.target.value);
    const { name, checked } = e.target;
    let tempItem = arr.map((item, i) =>
      item.id === data.id ? { ...item, isChecked: checked } : item
    );
    setArr(tempItem);
  };

  function del(e) {
    return !e.isChecked;
  }
  const handleDelete = () => {
    const result = arr.filter(del);
    console.log(result);
    setArr(result);
  };

  function display(users) {
    return users?.map((data, i) => {
      return (
        <tr>
          <input
            type="checkbox"
            name="data.id"
            id="data.id"
            checked={data?.isChecked || false}
            onChange={(e) => handleCheck(e, data)}
          />
          <td>{data.f_name}</td>
          <td>{data.l_name}</td>
          <td>{data.s_name}</td>
          <td>{data.email}</td>
          <td>{data.gender}</td>
          <td>{data.age}</td>
        </tr>
      );
    });
  }
 
  return (
    <div className="container1">
      <div className="btn">
        <button class="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <Popup
          className="popUp"
          trigger={<button class="btn btn-primary">Add Record</button>}
          position="bottom center"
          modal
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter ID: </label>
              <input
                type="number"  required 
                placeholder="Enter your Id"
                className="form-control"
                name="id"
                min="1"
                onChange={handleChange}
              ></input>
              
              
            </div>
            <div className="form-group">
              <label>Enter First Name: </label>
              <input
                type="text" required
                placeholder="Enter your first name"
                className="form-control"
                name="f_name"
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group">
              <label>Enter Last Name: </label>
              <input
                type="text" required
                placeholder="Enter your last name"
                className="form-control"
                name="l_name"
                
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group">
              <label>Enter Super Name: </label>
              <input
                type="text" required
                placeholder="Enter your name"
                className="form-control"
                name="s_name"
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group">
              <label>Enter Email: </label>
              <input 
                type="email" required
                placeholder="Enter your email"
                className="form-control"
                name="email"
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group">
              <label>Enter Gender: </label>
              <br />
              <input
                type="radio" 
                //className="form-control"
                name="gender"
                value="Male"
                id="checkGender"
                onChange={handleChange}
              ></input>
              <label>M</label>
              <br />
              <input
                type="radio" required
                //className="form-control"
                name="gender"
                value="Female"
                onChange={handleChange}
              ></input>
              <label>F</label>
            </div>
            <div className="form-group">
              <label>Enter Age: </label>
              <input
                type="number" required
                placeholder="Enter your age"
                className="form-control"
                name="age"
                min="1"
                max="100"
                onChange={handleChange}
              ></input>
            </div>
            <br />
            <button type="submit" value="Submit" className="form-control">
              Submit
            </button>
          </form>
        </Popup>
        <ReactSearchBox
          className="search1"
          type="search"
          placeholder="search..."
          value="Search"
          onChange={handleSearch}
        />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>
                First Name
                <button onClick="">
                  <i class="arrow up"></i>
                </button>
                <button>
                  <i class="arrow down"></i>
                </button>
              </th>
              <th>
                Last Name
                <button>
                  <i class="arrow up"></i>
                </button>
                <button>
                  <i class="arrow down"></i>
                </button>
              </th>
              <th>
                Superhero Name
                <button>
                  <i class="arrow up"></i>
                </button>
                <button>
                  <i class="arrow down"></i>
                </button>
              </th>
              <th>
                Email
                <button>
                  <i class="arrow up"></i>
                </button>
                <button>
                  <i class="arrow down"></i>
                </button>
              </th>
              <th>
                Gender
                <button>
                  <i class="arrow up"></i>
                </button>
                <button>
                  <i class="arrow down"></i>
                </button>
              </th>
              <th>
                Age
                <button>
                  <i class="arrow up"></i>
                </button>
                <button>
                  <i class="arrow down"></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{searchInput ? display(filteredResults) : display(arr)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Record;
