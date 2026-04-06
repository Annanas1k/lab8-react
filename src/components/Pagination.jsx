

export const Pagination = ({currentPage, totalPages, onPrev, onNext, totalResults}) =>{

    return(
        <div className="pagination">
            <button onClick={onPrev} disabled={currentPage === 1}>Back</button>

            <span>
                page: {currentPage} / {totalPages}   ({totalResults} results)
            </span>

            <button onClick={onNext} disabled={currentPage === totalPages}>Next</button>
        </div>
    )
}