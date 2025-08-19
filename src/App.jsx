import { useEffect, useState } from "react";

function App() {
  const [politicalData, setPoliticalData] = useState([]);

  useEffect(() => {
    (async () => {
      const resp = await fetch(`http://localhost:3333/politicians`);
      const politicians = await resp.json();
      setPoliticalData(politicians);
    })();
  }, []);

  return (
    <>
      <h1 className="text-center">Politici</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {politicalData.map((p, i) => (
          <div key={i} className="col">
            <div className="card h-100 d-flex flex-column">
              {/* immagine con altezza fissa e taglio proporzionato */}
              <img
                src={p.image}
                className="card-img-top"
                alt={p.name}
                style={{ objectFit: "cover", objectPosition: "50% 10%", height: "400px" }}
              />

              {/* corpo card in flex per tenere il bottone in basso */}
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
