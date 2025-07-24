// src/pages/JobsPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../Store/store';
import { setJobs } from '../Store/jobsSlice';
import { addBookmark, removeBookmark } from '../Store/bookmarksSlice';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import CustomPagination from '../components/Pagination';
import Filters from '../components/Filters';
import { Row, Col, Spinner } from 'reactstrap';
import type { Job } from '../types/job';

const JobsPage: React.FC = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobs.allJobs);
  const bookmarkedJobs = useSelector((state: RootState) => state.bookmarks.bookmarkedJobs);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://www.arbeitnow.com/api/job-board-api');
        dispatch(setJobs(res.data.data));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [dispatch]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = location
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : true;

      const matchesRemote = remoteOnly ? job.remote === true : true;

      return matchesSearch && matchesLocation && matchesRemote;
    });
  }, [jobs, searchTerm, location, remoteOnly]);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * jobsPerPage;
    return filteredJobs.slice(start, start + jobsPerPage);
  }, [filteredJobs, currentPage]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBookmarkToggle = (job: Job) => {
    const isBookmarked = bookmarkedJobs?.some(b => b.slug === job.slug);
    if (isBookmarked) {
      dispatch(removeBookmark(job.slug));
    } else {
      dispatch(addBookmark(job));
    }
  };

  return (
    <div className="container mt-5 pt-5 main-content">
                      <h2 className="">Job Listings</h2>

      <div className='d-flex justify-content-center flex-wrap gap-4'>

      <SearchBar onSearch={setSearchTerm} />
      <Filters
        location={location}
        remoteOnly={remoteOnly}
        onLocationChange={setLocation}
        onRemoteToggle={setRemoteOnly}
      />
      </div>
      {loading ? (
        <div className="text-center my-5">
          <Spinner color="primary" />
        </div>
      ) : (
        <>
          {paginatedJobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            <>
              <Row>
                {paginatedJobs.map((job) => (
                  <Col md='4'  xsm = '12' sm='12' lg='3' key={job.slug}>
                    <JobCard
                      job={job}
                      onBookmark={handleBookmarkToggle}
                      isBookmarked={bookmarkedJobs?.some(b => b.slug === job.slug)}
                    />
                  </Col>
                ))}
              </Row>

              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
      </div>
  );
};

export default JobsPage;
