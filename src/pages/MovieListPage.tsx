import {useEffect, useReducer} from "react";
import {MovieReducer} from "../reducers/MovieReducer.tsx";
import MovieItem from "../components/movie/MovieItem.tsx";
import {Button, Col, Container, Row} from "react-bootstrap";
import {MovieType} from "../components/movie/Movie.type.ts";
import {useNavigate} from "react-router";
import {PATH} from "../global/constants.ts";
import {axiosInstance} from "../global/axiosInstance.ts";

function MovieListPage() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const [state, dispatch] = useReducer(MovieReducer, {list: []})
    useEffect(() => {
        axiosInstance.get(`/movie`)
            .then((resp) => {
                const {data} = resp
                if (data.result === 'success') {
                    state.list = data.list;
                }
                dispatch({
                    type: 'ON_SHOW_ALL_LOAD',
                    payload: state
                })
                console.log(state.list)
            }).catch(() => {
            navigate('/')
        })
    }, [])

    return (

        <>
            <Container>
                <div className="d-flex justify-content-end mb-3">
                    {role == "ROLE_ADMIN" ?
                        <Button variant="primary" onClick={() => {
                            navigate(PATH.writeMovie)
                        }}>영화추가</Button> :
                        <Button variant="secondary" onClick={() => {
                            navigate(PATH.updateRole)
                        }}>권한요청</Button>}
                </div>
                <Row className="row-gap-3 row-cols-xl-4 row-cols-lg-3">
                    {
                        state.list.map((item: MovieType) => (
                            <Col key={item.id} className="justify-content-center d-flex">
                                <MovieItem item={item}/>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    );
}

export default MovieListPage;