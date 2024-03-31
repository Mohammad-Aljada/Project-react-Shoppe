import { Pagination } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
export default function PaginationComp({currentPage, totalPages,onPageChange,}){
  
  const pageItems = [];
  for (let i = 1; i <= totalPages; i++) {
    pageItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
  return (
    <>
      <div className="container d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {pageItems}
          <Pagination.Next
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </>
  );
}
