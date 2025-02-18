import { Button } from "@material-tailwind/react";

export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                color="gray"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                Prev
            </Button>

            {pageNumbers.map((page) => (
                <Button
                    key={page}
                    color={currentPage === page ? "blue" : "gray"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </Button>
            ))}

            <Button
                color="gray"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
        </div>
    );
}

export default Pagination;
