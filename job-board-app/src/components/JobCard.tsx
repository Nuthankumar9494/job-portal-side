import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import type { Job } from '../types/job';
import { sliceCharacters } from '../utils/utils';

interface JobCardProps {
  job: Job;
  onBookmark: (job: Job) => void;
  isBookmarked?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onBookmark, isBookmarked }) => (
  <Card className="mb-3">
    <CardBody className='card-height'>
      <CardTitle tag="h5" title={job?.title}>{sliceCharacters(job?.title)}</CardTitle>
      <CardSubtitle className="mb-2 text-muted">
        {job.company_name} - {job.location} {job.remote ? '(Remote)' : ''}
      </CardSubtitle>
      <p>Posted on: {new Date(job.created_at).toDateString()}</p>
      <Button
        color={isBookmarked ? 'danger' : 'primary'}
        onClick={() => onBookmark(job)}
      >
        {isBookmarked ? 'Unbookmark' : 'Bookmark'}
      </Button>
    </CardBody>
  </Card>
);

export default JobCard;
