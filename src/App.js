import React, { useState, useEffect } from "react";
import api from './services/api';
import gostack from './assets/gostack.png';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])




  useEffect((repositories) => {

    api.get('/repositories')
      .then(response => { setRepositories(response.data) })
      .catch((e) => console.warn(e));



  }, []);


  async function handleAddRepository() {
    //default object
    const repository = {
      id: "",
      title: "Knowledge is Power!",
      url: "www.skylab.com",
      techs: ["Francis", "Bacon"]
    }

    const response = await api.post('repositories', repository);
    setRepositories([...repositories, response.data]);


  }


  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories([...repositories].filter(rep => rep.id !== id));

  }

  return (
    <>
      <img src={gostack} alt="gostack" id="gs" width="800" height="657" />


      <div className="main">
        <h2>Welcome to challenge #2</h2>
        <div className="repo">
          <ul data-testid="repository-list">
            {
              repositories.map(rep =>
                <li key={rep.id}>
                  {rep.title}

                  <button onClick={() => handleRemoveRepository(`${rep.id}`)}>
                    Remover
                    </button>
                </li>
              )

            }

          </ul>


          <button onClick={handleAddRepository}>Adicionar</button>
        </div>
      </div>
    </>

  );
}

export default App;
