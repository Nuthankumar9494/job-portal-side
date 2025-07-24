import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../Store/store';
import { removeBookmark } from '../Store/bookmarksSlice';
import JobCard from '../components/JobCard';
import { Container, Row, Col } from 'reactstrap';
import type { Job } from '../types/job';

const BookmarksPage: React.FC = () => {
  const dispatch = useDispatch();
  const bookmarkedJobs = useSelector(
    (state: RootState) => state.bookmarks.bookmarkedJobs
  );

  const handleUnbookmark = (slug: string) => {
    dispatch(removeBookmark(slug));
  };

  return (
    <Container className="mt-5 pt-5">
      <h2 className="mb-4">Bookmarked Jobs</h2>

      {bookmarkedJobs.length === 0 ? (
        <p>No jobs bookmarked.</p>
      ) : (
        <Row>
          {bookmarkedJobs.map((job: Job) => (
            <Col  xsm = '12' sm='12' lg='3' md='4' key={job.slug}>
              <JobCard
                job={job}
                onBookmark={() => handleUnbookmark(job.slug)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BookmarksPage;
