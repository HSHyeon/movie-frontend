import {useEffect, useReducer, useState} from "react";
import {MovieReducer} from "../reducers/MovieReducer.tsx";
import MovieItem from "../components/movie/MovieItem.tsx";
import {Button, Col, Container, Row} from "react-bootstrap";
import {MovieType} from "../components/movie/Movie.type.ts";
import {useNavigate} from "react-router";
import {PATH} from "../global/constants.ts";
import {axiosInstance} from "../global/axiosInstance.ts";
import LogoutButton from "../components/user/LogoutButton.tsx";
import PaginationComp from "../components/PaginationComp.tsx";

function MovieListPage() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState(1);
    const [state, dispatch] = useReducer(MovieReducer, {list: []})
    useEffect(() => {
        axiosInstance.get(`/movie?page=${page}`)
            .then((resp) => {
                const {data} = resp
                console.log(resp)
                if (data.result === 'success') {
                    state.list = data.list;
                    setTotalPages(data.total)
                }
                dispatch({
                    type: 'ON_SHOW_ALL_LOAD',
                    payload: state
                })
            }).catch(() => {
            navigate('/')
        })
    }, [page])

    return (
        <>
            <Container>
                <div className="d-flex justify-content-end mb-3 gap-2">
                    {role == "ROLE_ADMIN" ?
                        <Button onClick={() => {
                            navigate(PATH.writeMovie)
                        }}>영화추가</Button> :
                        <Button onClick={() => {
                            navigate(PATH.updateRole)
                        }}>권한요청</Button>}
                    <LogoutButton/>
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
                <PaginationComp active={page} totalPages={totalPages} change={(num)=>{
                    setPage(num)
                }}/>
            </Container>
        </>
    );
}

export default MovieListPage;