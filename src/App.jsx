import { useEffect, useState, useMemo } from "react";
import PoliticianCard from "./components/PoliticianCard";

function App() {
  const [politicalData, setPoliticalData] = useState([]);
  const [search, setSearch] = useState("")
  const [selectPositions, setSelectPosition] = useState("")

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
    if(selectPositions === "filter for position") {
      return politicalData
    }
    return politicalData.filter(p => {
      const politicalName = p.name.toLowerCase().includes(search.toLowerCase());
      const politicalBiography = p.biography.toLowerCase().includes(search.toLowerCase());
      const position = selectPositions === p.position || selectPositions === ""
      return (politicalName || politicalBiography) && position
    })
  }, [politicalData, search, selectPositions])

  const positions = useMemo(() => {
    return politicalData.reduce((acc, p) => {
      if (!acc.includes(p.position)) {
        return [...acc, p.position]
      }
      return acc;
    }, [])
  }, [politicalData])

  console.log(positions);



  return (
    <>
      <h1 className="text-center">Politici</h1>
      <div className="d-flex justify-content-between mb-3 gap-3">
        <input
          className="form-control w-50"
          placeholder="search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="form-select w-50" value={selectPositions} onChange={e => setSelectPosition(e.target.value)}>
          <option selected>filter for position</option>
          {positions.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </select>
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
