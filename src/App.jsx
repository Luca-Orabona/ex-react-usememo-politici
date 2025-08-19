import { useEffect, useState, useMemo } from "react";
import PoliticianCard from "./components/PoliticianCard";

function App() {
  const [politicalData, setPoliticalData] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`http://localhost:3333/politicians`);
        const politicians = await resp.json();
        setPoliticalData(politicians);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);



  const filteredPoliticians = useMemo(() => {
    return politicalData.filter(p => {
      const politicalName = p.name.toLowerCase().includes(search.toLowerCase());
      const politicalBiography = p.biography.toLowerCase().includes(search.toLowerCase());
      return politicalName || politicalBiography
    })
  }, [politicalData, search])

  
  return (
    <>
      <h1 className="text-center">Politici</h1>
      <div className="d-flex justify-content-center">
        <input
          className="form-control mb-3 w-50"
          placeholder="search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {filteredPoliticians.map((p, i) => (
          <PoliticianCard 
          key={p.id}
          {...p} 
          />
        ))}
      </div>
    </>
  );
}

export default App;
