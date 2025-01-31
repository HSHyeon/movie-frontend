import {useEffect, useState} from "react";
interface StarRatingProps {
    max?: number;
    value?: number;
    onChange?: (value: number) => void;
}
function StarRating({ max = 5, onChange, value }:StarRatingProps) {
    const [rating, setRating] = useState<number>(value ?? 0);
    const [hover, setHover] = useState<number>(0);
    useEffect(() => {
        if (value !== undefined) {
            setRating(value);
        }
    }, [value]);

    const handleClick = (value:number) => {
        setRating(value);
        if (onChange) onChange(value);
    };

    return (
        <div className="star-rating">
            {[...Array(max)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <svg
                        key={index}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill={starValue <= (hover || rating) ? "#ffc107" : "#d6d8df"}
                        viewBox="0 0 24 24"
                        className="star"
                        style={{ cursor: "pointer" }}
                    >
                        <path d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"></path>
                    </svg>
                );
            })}
        </div>
    );
}

export default StarRating;
