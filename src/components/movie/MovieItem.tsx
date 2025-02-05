import {Card} from "react-bootstrap";
import {useNavigate} from "react-router";
import {PATH} from "../../global/constants.ts";
import {MovieType} from "./Movie.type.ts";
import {SyntheticEvent} from "react";

function MovieItem({item}: { item: MovieType }) {
    const navigate = useNavigate();

    const handleClick = (id: string) => {
        navigate(PATH.movieDetail(id));
    }
    const handleErrorImg =(e: SyntheticEvent<HTMLImageElement, Event>)=>{
        e.currentTarget.src="/default.jpg"
    }
    return (
        <>
            <Card onClick={() => handleClick(item.id)} className="border-0 h-100"
                  style={{width: "14rem", cursor: "pointer", position: "relative"}}>

                <Card.Img src={item.imageUrl} style={{height: "20rem", objectFit: "cover"}} onError={handleErrorImg}
                          className="border border-1"/>
                <div className="hover-content shadow">
                    <p className="title fs-5 fw-bold">{item.title}</p>
                    <p className="text-light release-year">{new Date(item.releaseDate).getFullYear()} • {item.genre}</p>
                    <div className="rating mt-1">
                        {item.averageRating !== -1 ? (
                            <p className="rating-text">
                                평균 ⭐ {item.averageRating.toFixed(1)}
                            </p>
                        ) : (
                            <p className="no-rating">평가 없음</p>
                        )}
                    </div>
                </div>

                <div className="text-start my-2">
                    <p className="title fs-6 fw-bolder">{item.title}</p>
                    <p className=" release-year">{new Date(item.releaseDate).getFullYear()} • {item.genre}</p>
                    <div className="rating">
                        {item.averageRating !== -1 ? (
                            <p className="rating-text">
                                평균 ⭐ {item.averageRating.toFixed(1)}
                            </p>
                        ) : (
                            <p className="no-rating">평가 없음</p>
                        )}</div>
                </div>
            </Card>
        </>
    );
}

export default MovieItem;