import { use, useState } from "react";
import "./App.css";
import data from "./data/data.json";
function App() {
  const [userdata, setUserData] = useState(data.users);
  const [coursedata, setCourseData] = useState(data.courses);
  const [searchName, setSearchName] = useState("");
  const [expandable, setExpandanle] = useState({});
  const [counter,setcoutner] = useState(7)
  const [formdata,setFormdata] = useState({
    username:"",
    email:"",
    role:""


  })

  if (userdata) {
    localStorage.setItem("data", JSON.stringify(userdata));
  }
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchName(e.target.value.trim());
    console.log(search);

    const filered = userdata.filter((user) => {
      console.log(user);
      if (user.name == search) return user;
    });
    setUserData(filered);
    const coursefilter = coursedata.filter((user) => {
      console.log(user);
      if (user.title == search) return user;
    });
    setUserData(filered);
    setCourseData(coursefilter);
  };
  
    
    const addUser = (e)=>{
      console.log(e)
      const {name,value} = e.target;
      setFormdata((x)=>({...x,[name]:value}))
      console.log(formdata)
    }
    const showuserdata = (val) => {
      setExpandanle((prev) => ({
        ...prev,
        [val.id]: {
          isExpandable: !prev[val.id]?.isExpandable,
        },
      }));
    
  };
  const addUsertodata = ()=>{
    const newUser = {
      id: counter,   // or userdata.length + 1
      ...formdata
    };
    
  
    setUserData((prev) => [...prev, newUser]);
    setcoutner((prev) => prev + 1);
  
    
    // const newUser = [[...formdata]]
    console.log(newUser)
  }
  return (
    <>
      <h1>hello</h1>
      <input
        type="text"
        // value={username}
        // name={username}
        placeholder="search by name"
        onChange={handleSearch}
      />
<div >
       <input
        type="text"
        value={formdata.username}
        name="username"
        onChange={addUser}
        placeholder="add user name"
        
      />
      <input
        type="text"
        value={formdata.email}
        name="email"
        onChange={addUser}
        placeholder="add user email"
        
      />
      <input
        type="text"
        value={formdata.role}
        name="role"
        onChange={addUser}
        placeholder="add user Role"
        
      />
    <select  name="courseId" onChange={addUser}>
        <option value="">-- Choose a Role --</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
        <option value="Computer Science">Teacher</option>
        <option value="Cloud">Cloud</option>
      </select>
      <button onClick={addUsertodata} >add user</button>
      </div>

      {userdata &&
        userdata.map((val, ind) => {
          const coursearry = coursedata.filter((id) => {
            if (val.id == id.id) {
              return id;
            }
          });

          return (
            <div key={ind}>
              <div>{val.id}</div>
              <div onClick={() => showuserdata(val)}>{val.name}</div>
              <div>{val.role}</div>
              <div>{val.email}</div>

              {expandable[val.id]?.isExpandable && (
                <div>
                  <h2>Course</h2>
                  {coursearry &&
                    coursearry.map((value, ind) => {
                      return (
                        <div key={value.id}>
                          <div>{value?.title}</div>
                          <div>{value.category}</div>
                          <div>{value.description}</div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}

export default App;
