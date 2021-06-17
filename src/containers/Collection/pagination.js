import React from "react";

import { usePagination, DOTS } from "../../hooks/usePagination";

import styled from "styled-components";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <PaginationContainer>
      {/* Left navigation arrow */}
      <PaginationItem>
        <Arrow left onClick={onPrevious}/>
      </PaginationItem>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <PaginationItem
            onClick={() => onPageChange(pageNumber)}
            selected={pageNumber === currentPage}
          >
            {pageNumber}
          </PaginationItem>
        );
      })}
    
      <PaginationItem
        onClick={onNext}
      >
        <Arrow right/>
      </PaginationItem>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.ul`
  display: flex;
  list-style-type: none;
`;

const PaginationItem = styled.li`
  padding: 0 12px;
  height: 32px;
  text-align: center;
  margin: auto 4px;
  color: var(--yellow);
  display: flex;
  box-sizing: border-box;
  align-items: center;
  letter-spacing: 0.01071em;
  border-radius: 16px;
  line-height: 1.43;
  font-size: 13px;
  min-width: 32px;
  
  &:hover {
    background-color: ${props => props.dots ? `transparent` : `rgba(0, 0, 0, 0.04)` };
    cursor: ${props => props.dots ? `default` : ` pointer` }
  }
 
  ${(props) => props.selected && `border: 1px solid var(--yellow);`}
`;

const Arrow = styled.div`
 &::before {
        position: relative;
        /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
        content: '';
        /* By using an em scale, the arrows will size with the font */
        display: inline-block;
        width: 0.4em;
        height: 0.4em;
        border-right: 0.12em solid var(--yellow);
        border-top: 0.12em solid var(--yellow);
      }
        ${(props) => props.right && `transform: rotate(45deg);`}
        ${(props) => props.left && `transform: rotate(-135deg) translate(-50%);`}
        ${(props) => props.disabled &&
        `pointer-events: none;
        &:before {
        border-right: 0.12em solid rgba(0, 0, 0, 0.43);
        border-top: 0.12em solid rgba(0, 0, 0, 0.43);
        }

        &:hover {
        background-color: transparent;
        cursor: default;
            }
        }
      `}
     
   `;

export default Pagination;
