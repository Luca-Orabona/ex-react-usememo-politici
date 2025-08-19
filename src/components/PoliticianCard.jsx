import { memo } from "react";

const PoliticianCard = memo(
    ({ name, image, biography, position }) => {
        console.log("card");

        return (
            <div className="col">
                <div className="card h-100 d-flex flex-column">

                    <img
                        src={image}
                        className="card-img-top"
                        alt={name}
                        style={{ objectFit: "cover", objectPosition: "50% 10%", height: "400px" }}
                    />


                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{name}</h5>
                        <i>{position}</i>
                        <p className="card-text flex-grow-1">
                            {biography}
                        </p>
                        <a href="#" className="btn btn-primary w-100 mt-auto">
                            Details
                        </a>
                    </div>
                </div>
            </div>
        )
    }
)


export default PoliticianCard;