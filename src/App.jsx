import { useEffect, useState, useMemo } from "react";

function App() {
  const [politicalData, setPoliticalData] = useState([]);
  const [search, setSearch] = useState("")
 

  useEffect(() => {
    (async () => {
      const resp = await fetch(`http://localhost:3333/politicians`);
      const politicians = await resp.json();
      setPoliticalData(politicians);
    })();
  }, []);

 

  const filteredPoliticians = useMemo(() => {
    return politicalData.filter(p => {
      const politicalName = p.name.toLowerCase().includes(search.toLowerCase());
      const politicalBiography = p.biography.toLowerCase().includes(search.toLowerCase());
      return politicalName || politicalBiography
    })
  }, [politicalData, search])

  console.log(filteredPoliticians);


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
          <div key={i} className="col">
            <div className="card h-100 d-flex flex-column">

              <img
                src={p.image}
                className="card-img-top"
                alt={p.name}
                style={{ objectFit: "cover", objectPosition: "50% 10%", height: "400px" }}
              />


              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <i>{p.position}</i>
                <p className="card-text flex-grow-1">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
                <a href="#" className="btn btn-primary w-100 mt-auto">
                  Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
