/*import React, { useState } from 'react'
import RoomCard from '../room/RoomCard'
import RoomPaginator from './RoomPaginator'
import { Row, Button} from 'react-bootstrap'

const RoomSearchResult = ({ results, onClearSearch }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const resultPerPage = 3
    const totalResults = results.length()
    const totalPages = Math.ceil(totalResults / resultPerPage)

    const handlePaheChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const startIndex = (currentPage - 1) * resultPerPage
    const endIndex = startIndex + resultPerPage
    const paginatedResult = results.slice(startIndex, endIndex)

    return (
        <>
            {results.length > 0 ? (
                <>
                    <h5 className='text-center mt-5'>Search Result </h5>
                    <Row>
                        {paginatedResult.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </Row>
                    <Row>
                        {totalResults > resultPerPage && (
                            <RoomPaginator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePaheChange}
                            />
                        )}
                        <Button
                            variant="secondary" onClick={onClearSearch}
                        >
                            Clear Search
                        </Button>
                    </Row>

                </>

            ) : (
                <p></p>
            )}
           
        </>
    )
}

export default RoomSearchResult*/

import React, { useState } from 'react';
import RoomCard from '../room/RoomCard';
import RoomPaginator from './RoomPaginator';
import { Row, Button } from 'react-bootstrap';

const RoomSearchResult = ({ results, onClearSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = results.slice(startIndex, endIndex);

  return (
    <>
      {totalResults > 0 ? (
        <>
          <h5 className="text-center mt-5">Search Result</h5>
          <Row>
            {paginatedResults.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </Row>
          <Row className="mt-3 d-flex justify-content-between align-items-center">
            {totalResults > resultsPerPage && (
              <RoomPaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            <Button variant="secondary" onClick={onClearSearch}>
              Clear Search
            </Button>
          </Row>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default RoomSearchResult;

