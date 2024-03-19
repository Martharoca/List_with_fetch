// import React, {useState, useEffect} from "react";



// //create your first component
// const Home = () => {
// 	const styles = {
// 		xIcon: {
// 			float: "right",
// 			color: "red",
// 		},
// 	  };
// 	const [inputValue, setInputValue] = useState("");
// 	const [toDos, settoDos] = useState([]);
	
//     const newUser = () => {
//         fetch ("https://playground.4geeks.com/apis/fake/todos/user/marta992", {
//             method: "POST",
//             body: JSON.stringify([]),
//             headers: {'Content-Type': "application/json"}
//     })
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.log("error"))
// };
    
//     const getList = () => {
//         fetch("https://playground.4geeks.com/apis/fake/todos/user/marta992", {
//         method: "GET",
//         })
//         .then((response) => {
//             if (response.status === 404) {
//                 newUser();
//                 return [];
//             }
//             return response.json();
//         })
//         .then((data) => {
//             settoDos(data);
//         })
//         .catch((error) => console.log(error))
//         };


//     const updateToDoList = () => {
//         fetch ("https://playground.4geeks.com/apis/fake/todos/user/marta992", {
//             method: "PUT",
//             body: JSON.stringify(toDos),
//             headers: {'Content-Type': "application/json"}
//     })
//         .then((response) => {
//             if (response.status === 404) {
//                 newUser();
//                 return toDos;
//             }
//             return response.json();
//         })
//         .then(data => console.log(data))
//         .catch(error => console.log(error))
//     };

//      useEffect(() => {
//          getList();
//      }, []);

//     // useEffect(() => {
//     //     if (toDos.length > 0) {
//     //         updateToDoList();
//     //     }
//     // }, [toDos]);


// 	return (
// 		<div className="container">
// 			<h1> toDos</h1>
// 			<ul>
// 				<li> <input 
//                     type="text" 
//                     onChange={(e)=> setInputValue(e.target.value)}
//                     value={inputValue}
//                     onKeyDown={(e)=>{
//                         if(e.key=== "Enter" ){
//                         settoDos(toDos.concat(inputValue));
// 						setInputValue("")
//                         }
//                     }}
//                     placeholder="What do you need to do?"/> </li>
// 				{toDos.map((item, index)=> (
// 				<li>{item}<i className="fas fa-times" style={styles.xIcon}
// 				onClick={() => settoDos(toDos.filter((t, currentIndex) => index != currentIndex))}  > </i></li>))}
// 			</ul>
// 		<div> {toDos.length} item left</div>
// 		</div>
// 	);
// };

// export default Home;


import React, { useEffect, useState } from "react";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [toDos, settoDos] = useState([]);
    const [hover, setHover] = useState(null);

    const newUser = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/marta992', { 
            method:'POST',
            body: JSON.stringify([]),
            headers:{'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log("error"))
    };

    const getList = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/marta992', {
            method:'GET',
        })
        .then((response) => {
            if (response.status === 404) {
                newUser();
                return [];
            }
            return response.json();
        })
        .then((data) => {
            settoDos(data);
        })
        .catch((error) => console.log(error))
    };

    const updateList = () => {  
        fetch('https://playground.4geeks.com/apis/fake/todos/user/marta992', {
            method:'PUT',
            body: JSON.stringify(toDos),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.status === 404) {
                newUser();
                return toDos;
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.log(error))
    };

    const deleteTask = () => {
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

    const onDeleteIconClick = (elem, index) => {
        if (toDos.length === 1) {
            deleteTask();
        } else {
            settoDos(toDos.filter((elem, i) => index !== i));
        }
    };

    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        if (toDos.length > 0) {
            updateList();
        }
    }, [toDos]);

    return (
        <div className="principal">
            <p className="fw-lighter">todos</p>
            <div className="tarjeta">
                <input
                    type="text"
                    placeholder="What needs to be done?" 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyDown={onPressEnter} 
                    value={inputValue}
                />

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
                </ul>    
                <div className="contador">{toDos.length} item left</div>
                {toDos.length > 0 && (
                    <button className="btn btn-danger m-2" onClick={deleteTask}>Eliminar tareas</button>
                )}
            </div>
            <div className="tarjeta2"></div>
            <div className="tarjeta3"></div>
        </div>
    );
};

export default Home;