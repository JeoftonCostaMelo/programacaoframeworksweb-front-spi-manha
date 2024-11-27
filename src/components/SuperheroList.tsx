import React, { useState, useEffect } from "react";
import axios from "axios";
import SuperheroCard from "./SuperheroCard";
import ISuperhero from "../interfaces/ISuperhero";
import SuperheroForm from "./SuperheroForm";
// import SuperheroForm from "./SuperheroForm";

const SuperheroList: React.FC = () => {
  const [heroes, setHereos] = useState<ISuperhero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = "http://localhost:5000/api/";
 const loadHeroes = () => {
    setLoading(true);
    axios
      .get(`${baseURL}superheroes`)
      .then((response) => {
        console.log(response)
        setHereos(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao carregar super-heróis");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadHeroes();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h1>Lista de Super-heróis</h1>
      <SuperheroForm token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTA4ZDc2ZWQ2YmI1YTllZjU1MGNjZCIsImlhdCI6MTczMjcwNzkyOSwiZXhwIjoxNzMyNzExNTI5fQ.bX8uSSCS8XCdE_z-YJ58Ttb1EvZnhTUb_BmzdOCoJMw"} onSuccess={loadHeroes} />
      <div className="superhero-list">
        {heroes.map((hero) => (
            <SuperheroCard key={hero._id} hero={hero}/>
        ))}
      </div>
    </div>
  );
};
export default SuperheroList;
