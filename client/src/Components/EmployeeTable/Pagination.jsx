
const Pagination = ({ employees, currentPage, setCurrentPage, totalPages, }) => {

    return (
        <div>
            <button onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >Previous</button>
            <div>{currentPage}/{totalPages}</div>
            <button onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >Next</button>
        </div>
    );
};

export default Pagination;
