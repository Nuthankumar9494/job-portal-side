import React from 'react';
import { FormGroup, Label, Input, Row, Col } from 'reactstrap';

interface FiltersProps {
  location: string;
  remoteOnly: boolean;
  onLocationChange: (value: string) => void;
  onRemoteToggle: (checked: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({
  location,
  remoteOnly,
  onLocationChange,
  onRemoteToggle,
}) => {
  return (
    <Row>
      <Col md={6}>
        <FormGroup>
          <Label for="location" className='fw-medium'>Filter by Location</Label>
          <Input
            id="location"
            type="text"
            placeholder="e.g. Bangalore, Berlin..."
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup check className="mt-4">
          <Input
            id="remoteOnly"
            type="checkbox"
            checked={remoteOnly}
            onChange={(e) => onRemoteToggle(e.target.checked)}
          />
          <Label for="remoteOnly" check>
            Remote Only
          </Label>
        </FormGroup>
      </Col>
    </Row>
  );
};

export default Filters;
