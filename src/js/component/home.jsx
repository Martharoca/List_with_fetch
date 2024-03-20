import React, { useEffect, useState } from "react";

const Home = () => {
    const styles = {
         		xIcon: {
        	float: "right",
        		color: "red",
        		},
        	  };
    const [inputValue, setInputValue] = useState("");
    const [toDos, settoDos] = useState([]);

    function newUser() { 
		fetch('https://playground.4geeks.com/apis/fake/todos/user/marta92',{
			method: "POST", 
			headers: { 
				"Content-Type":"application/json"
			},
			body: JSON.stringify([]) 
			})
			.then((respuesta) => respuesta.json())
			.then((data) => console.log(data))
			.catch(error => console.log(error))
	}

    function getList() {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/marta92', {
			method: "GET"
		})
			.then((respuesta) => respuesta.json())
			.then((data) => settoDos(data))
			.catch(error => console.log(error))
	}

    function updateList() {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/marta92',{
			method: "PUT",
			headers: {	
				"Content-Type":"application/json"
		},
		body: JSON.stringify(toDos)
		})
		.then((respuesta) => respuesta.json())
		.then((data) => settoDos(data))
		.catch(error => console.log(error))
	}


    useEffect(() => {
        newUser()
        getList()
    }, [])

    return (
        <div className="container">
            <h1>toDos</h1>
            <ul>
                <li><input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        settoDos(toDos.concat({label: inputValue, done: false}));
                        setInputValue("");
                       // updateList();
                    }
                }}
                placeholder="What do you need to do? "/> </li>
                {toDos.map((item,index) => (
                    <li> {item.label}  
                    <i className="fas fa-times" style= {styles.xIcon}
                    onClick={() => settoDos(toDos.filter((t, currentindex) => index != currentindex))} ></i>
                    </li>
                ))}
            </ul>
            <div> {toDos.length} item left </div>
        </div>
    );
                };
       


export default Home;