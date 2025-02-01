import { Pagination } from "react-bootstrap";

interface PaginationProps {
    active: number;
    totalPages: number;
    change: (page: number) => void;
}

function PaginationComp({ active, totalPages, change }: PaginationProps) {
    const items = [];
    if (totalPages < 1) return null;

    let startPage = active - 2;
    let endPage = active + 2;

    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else if (active <= 3) {
        startPage = 1;
        endPage = 5;
    } else if (active >= totalPages - 2) {
        startPage = totalPages - 4;
        endPage = totalPages;
    }

    for (let number = startPage; number <= endPage; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => change(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="justify-content-center d-flex m-5">
            <Pagination>
                <Pagination.First
                    onClick={() => change(1)}
                    disabled={active === 1}
                />
                {items}
                <Pagination.Last
                    onClick={() => change(totalPages)}
                    disabled={active === totalPages}
                />
            </Pagination>
        </div>
    );
}

export default PaginationComp;
