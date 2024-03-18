import React, { useEffect, useState } from "react";

const Home = () => {
    const styles = {
        xIcon: {
            float:"right",
            color:"red",
        },
    };
    const [inputValue, setInputValue] = useState("");
    const [toDos, settoDos] = useState([]);
   //  const [hover, setHover] = useState(null);

    function createUser ()  {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/marta992', { 
            method:'POST',
            body: JSON.stringify([]),
            headers:{'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log("error"))
    };

    const getToDos = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/marta992', {
            method:'GET',
        })
        .then((response) => {
            if (response.status === 404) {
                createUser();
                return [];
            }
            return response.json();
        })
        .then((data) => {
            sethome(data);
        })
        .catch((error) => console.log(error))
    };

    const putToDos = () => {  
        fetch('https://playground.4geeks.com/apis/fake/todos/user/marta992', {
            method:'PUT',
            body: JSON.stringify(todoList),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.status === 404) {
                createUser();
                return toDos;
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.log(error))
    };

    const deleteToDos = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/marta992', {
          method: "DELETE",
          headers:{
            "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => settoDos([]))
        .catch(error => console.log(error));
    };

    const onPressEnter = (e) => {
        if (e.key === "Enter") {
            settoDos(toDos.concat({ label: e.target.value, done:false}));
            setInputValue("");
        }
    };

    //METIENDO EL XICON PUEDE SER QUE NO ME SEA NECESARIO METER EL ONDELETEICON
    // const onDeleteIconClick = (elem, index) => {
    //     if (toDos.length === 1) {
    //         deleteToDos();
    //     } else {
    //         settoDos(toDos.filter((elem, i) => index !== i));
    //     }
    // };

    useEffect(() => {
        getToDos();
    }, []);

    useEffect(() => {
        if (toDos.length > 0) {
            putToDos();
        }
    }, [toDos]);

    return (
        <div className="container">
            <h1> toDos </h1>
            <div className="tarjeta">
                <input
                    type="text"
                    placeholder="What needs to be done?" 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyDown={onPressEnter} 
                    value={inputValue}
                />

                {toDos.map((item, index)=> (
	 			<li>{item}<i className="fas fa-times" style={styles.xIcon}
	 			onClick={() => settoDos(toDos.filter((t, currentIndex) => index != currentIndex))}  > </i></li>))}
{/* 
                <ul>
                    {toDos.length > 0 ? toDos.map((elem, index) => (
                        <li 
                            key={index}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(null)}
                        >
                            {elem.label} 
                            <i className={`fas fa-times icono ${index === hover ? "hover" : "" }`}
                                onClick={() => onDeleteIconClick(elem, index)}
                            />
                        </li>
                    )) : (
                        <li className="agregarTarea">No hay tareas, añadir tareas</li>
                    )}
                </ul>     */}
                <div className="contador">{toDos.length} item left</div>
                {toDos.length > 0 && (
                    <button className="btn btn-danger m-2" onClick={deleteToDos}>Clean All Tasks</button>
                )}
            </div>
            <div className="tarjeta2"></div>
            <div className="tarjeta3"></div>
        </div>
    );
};

export default Home;