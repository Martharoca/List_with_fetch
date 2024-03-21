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

    function updateList(newToDos) {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/marta92',{
			method: "PUT",
			headers: {	
				"Content-Type":"application/json"
		},
		body: JSON.stringify(newToDos)
		})
		.then((respuesta) => respuesta.json())
		.then((data) => getList()) /* al finalizar el update de mi lista, llamo a mi función getList() para que de forma dinámica se actualice mi lista de tareas de 
        manera local con lo que hay en la API   */
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
                        const newToDos = toDos.concat({label: inputValue, done: false}); // creo la variable donde guardo mi lista de newToDos
                        setInputValue("");
                       updateList(newToDos); // aqui envio la lista actualizada como param a la funcion de updateList
                       getList() // aqui llamo a getList() para actualizar LOCALMENTE mi lista de toDos basado en lo que hay ahora en la API
                    }
                }}
                placeholder="What do you need to do? "/> </li>
                {toDos.map((item,index) => (
                    <li> {item.label}  
                    <i className="fas fa-times" style= {styles.xIcon}
                    onClick={() => updateList(toDos.filter((t, currentindex) => index != currentindex))} ></i>
                    </li>
                ))}
            </ul>
            <div> {toDos.length} item left </div>
        </div>
    );
                };
       


export default Home;