import React, { useEffect, useState } from "react";
import ReactSearchBox from "react-search-box";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Record.css";

function Record() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [arr, setArr] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResulted] = useState([]);
  const [stat, setStat] = useState(true);
  const [order, setOrder] = useState("ASC");
  const [desOrder, setDesOrder] = useState("DSC");
  const [validFname, setValidFname] = useState("");
  const [fNameErr, setFNameError] = useState("");
  const [validLname,setValidLname] = useState("");
  const [lNameErr,setLNameError] = useState("");
  const [validEmail,setValidEmail] = useState("");
  const [emailError,setEmailError] = useState("");
  
  
  useEffect(() => {
    var key = localStorage.getItem("users");
    if (key) {
      var get = JSON.parse(localStorage.getItem("users"));
      setArr(get);
      setFilteredResulted(get)
      
    }
    
  }, []);
  
  useEffect(() => {
    if (!stat) {
      console.log("state");
      localStorage.setItem("users", JSON.stringify(arr));
    } else {
      setStat(false);
    }
  }, [arr, stat]);
  
  
  let count=arr.length;
 
    const [record, setRecord] = useState({
      id: count,
      f_name: "",
      l_name: "",
      s_name: "",
      email: "",
      gender: "",
      age: "",
    });

  
  const validCharacters= /^[a-zA-Z]*$/

  
  const handleChange = (e) => {
    //console.log(e.target.value)
    if (e.target.name === "f_name") {
      if (!validCharacters.test(e.target.value)
      ) {
        setValidFname(false);
        setFNameError("Invalid FirstName");
        setRecord({
          ...record,
          [e.target.name]: e.target.value,
        }); 
      } else {
        setValidFname(true);
        setFNameError("");  
        setRecord({
          ...record,
          [e.target.name]: e.target.value,
        });     
      }
    }
    if (e.target.name === "l_name") {
      console.log(e.target.value)
      if (!validCharacters.test(e.target.value)) {
       
        setValidLname(false);
        setLNameError("Invalid lastName");
        setRecord({
          ...record,
          [e.target.name]: e.target.value,
        }); 
      } else {
        setValidLname(true);
        setLNameError("");
        setRecord({
          ...record,
          [e.target.name]: e.target.value,
        });   
      }
    }
    if(e.target.name === "email"){
      const regex = /^[A-Za-z0-9+_.]{3,}@[A_Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
      console.log(e.target.value, e.target.value.match(regex))
      if(!(regex.test(e.target.value))){
        console.log("inside")
        setValidEmail(false);
        setEmailError("Invalid Email")
        setRecord({
          ...record,
          [e.target.name]: e.target.value,
        });  
      }else{
        setValidEmail(true);
        setEmailError("");
        setRecord({
          ...record,
          [e.target.name]: e.target.value,
        });   
      }
    }
    if((e.target.name === "s_name")||(e.target.name === "gender")||(e.target.name === "age")){
      setRecord({
        ...record,
        [e.target.name]: e.target.value,
      });  

    }
  };

  const handleSubmit = (e,close) => {
    e.preventDefault();
    const data=([...arr, record])
    if(fNameErr || lNameErr || emailError){
      return;
    }
    else{
      setArr([...arr, record]);
      localStorage.setItem("users", JSON.stringify(data))
     
      // close()
    }
    setRecord({...record,
      age:"",
      f_name: "",
      l_name: "",
      s_name: "",
      email: "",
      })
      setArr(data)
      setFilteredResulted(data)
      count++;
    
  };

  const handleSearch = (event) => {
 
    setSearchInput(event);
    if (event) {
      const filteredData = arr.filter((item) => {
        const search = event.toLowerCase();
        return (
          item.f_name.toLowerCase().includes(search) ||
          item.l_name.toLowerCase().includes(search) ||
          item.s_name.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search) ||
          item.age.toLowerCase().includes(search)||
          item.gender.toLowerCase().includes(search)
        );
      });
      setFilteredResulted(filteredData);
      if(!event){
        setFilteredResulted(arr);
      }
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

  const sorting1 = (col) => {
    if (order === "ASC") {
      const sorted = [...arr].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setArr(sorted);
    }
  };

  const sorting2 = (col) => {
    if (desOrder === "DSC") {
      const sorted = [...arr].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setArr(sorted);
    }
  };

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
          {close => (<form onSubmit={(e) => {handleSubmit(e,close)}}>
            <div className="form-group">
              <h2>Add details</h2>
            </div>
            <button id ="close" onClick={close}>×</button>
            
            
            <div className="form-group">
              <label>Enter First Name: </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="form-control"
                name="f_name"
                value={record.f_name}
                onChange={handleChange}
              ></input>
              {fNameErr}
            </div>
            <div className="form-group">
              <label>Enter Last Name: </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="form-control"
                name="l_name"
                value={record.l_name}
                onChange={handleChange}
              ></input>{lNameErr}
            </div>
            <div className="form-group">
              <label>Enter Super Name: </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                className="form-control"
                name="s_name"
                value={record.s_name}
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group">
              <label>Enter Email: </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="form-control"
                name="email"
                value={record.email}
                onChange={handleChange}
              ></input>{emailError}
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
                type="radio"
                required
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
                type="number"
                required
                placeholder="Enter your age"
                className="form-control"
                name="age"
                min="1"
                max="100"
                // value={formValues.age}
                onChange={handleChange}
              ></input>
            </div>
            <br />
            <button type="submit" value="Submit" className="form-control">
              Submit
            </button>
          </form>)}
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
            <tr >
              <th>#</th>
              <th>
                First Name
                <i onClick={() => sorting1("f_name")} class="arrow up"></i>
                <i onClick={() => sorting2("f_name")} class="arrow down"></i>
              </th>
              <th>
                Last Name
                <i onClick={() => sorting1("l_name")} class="arrow up"></i>
                <i onClick={() => sorting2("l_name")} class="arrow down"></i>
              </th>
              <th>
                Superhero Name
                <i onClick={() => sorting1("s_name")} class="arrow up"></i>
                <i onClick={() => sorting2("s_name")} class="arrow down"></i>
              </th>
              <th>
                Email
                <i onClick={() => sorting1("email")} class="arrow up"></i>
                <i onClick={() => sorting2("email")} class="arrow down"></i>
              </th>
              <th>
                Gender
                <i onClick={() => sorting1("gender")} class="arrow up"></i>
                <i onClick={() => sorting2("gender")} class="arrow down"></i>
              </th>
              <th>
                Age
                <i onClick={() => sorting1("age")} class="arrow up"></i>
                <i onClick={() => sorting2("age")} class="arrow down"></i>
              </th>
            </tr>
          </thead>
          <tbody>{display(filteredResults)} </tbody>
        </table>
      </div>
    </div>
  );
}

export default Record;
