import React, { useState } from "react";
import ISuperhero from "../interfaces/ISuperhero";
import axios from "axios";

interface SuperheroFormProps {
  hero?: ISuperhero;
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTA4ZDc2ZWQ2YmI1YTllZjU1MGNjZCIsImlhdCI6MTczMjcwNzkyOSwiZXhwIjoxNzMyNzExNTI5fQ.bX8uSSCS8XCdE_z-YJ58Ttb1EvZnhTUb_BmzdOCoJMw";
  onSuccess: () => void;
}

const baseURL = "http://localhost:5000/api/superheroes/";

const SuperheroForm: React.FC<SuperheroFormProps> = ({
  hero,
  token,
  onSuccess,
}) => {
  const [nome, setNome] = useState(hero?.nome || "");
  const [poderes, setPoderes] = useState(hero?.poderes.join(", ") || "");
  const [equipe, setEquipe] = useState(hero?.equipe || "");
  const [status, setStatus] = useState(hero?.status || "Active");
  const [nivelPoder, setNivelPoder] = useState(hero?.nivelPoder || "");
  const [baseOperacional, setBaseOperacional] = useState(
    hero?.baseOperacional || "");

  const manipularSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const heroDados = {
      nome,
      poderes: poderes.split(",").map((p) => p.trim()),
      equipe,
      status,
      baseOperacional,
      nivelPoder,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (hero?._id) {
        await axios.put(`${baseURL}${hero._id}`, heroDados, config);
      } else {
        await axios.post(`${baseURL}`, heroDados, config);
      }
      onSuccess();
      setNome("");
      setPoderes("");
      setEquipe("");
      setStatus("");
      setNivelPoder(50);
      setBaseOperacional("");
      onSuccess();
    } catch (error) {
      console.log("Erro ao salvar o super-herói. ", error);
    }
  };

  return (
    <form onSubmit={manipularSubmit}>
      <div>
        <label htmlFor="">Nome:</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div>
        <label htmlFor="">Poderes:</label>
        <input value={poderes} onChange={(e) => setPoderes(e.target.value)} />
      </div>
      <div>
        <label htmlFor="">Equipe:</label>
        <input value={equipe} onChange={(e)=> setEquipe(e.target.value)} />
      </div>
      <div>
        <label htmlFor="">Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Base Operacional:</label>
        <input value={baseOperacional} onChange={(e) => setBaseOperacional(e.target.value)} />
      </div>
      <div>
        <label htmlFor="">Nível de Poder:</label>
        <input type="number" value={nivelPoder} onChange={(e) => setNivelPoder(Number(e.target.value))}
        min='50'
        max="100" />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};
export default SuperheroForm;
