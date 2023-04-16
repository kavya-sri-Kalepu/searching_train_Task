import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Container, Form, Button, Table, Row, Col } from 'react-bootstrap';

function App() {
  const [stations, setStations] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      const response = await fetch('http://localhost:5005/api/stations');
      const data = await response.json();
      setStations(data);

    };

    fetchStations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(false);

    const response = await fetch(
      `http://localhost:5005/api/trains?source=${source}&destination=${destination}`
    );
    const data = await response.json();

    setTrains(data);
    setSearched(true);
  };

  return (
    <div className="App" style={{ marginTop: '20px', backgroundSize: 'cover' }}>
      <Container fluid className="main-container">
        <h1 className="main-heading text-center">Station Searcher</h1>
          <Row>
          <Col xs={12} md={3} className='left-side-section'>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="source">
                <Form.Label>From :</Form.Label>
                <Form.Control
                  as="select"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  required
                >
                  <option value="">Select source station</option>
                  {stations.map((eachStation) => (
                    <option key={eachStation.station} value={eachStation.station}>
                      {eachStation.station}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="destination">
                <Form.Label>To :</Form.Label>
                <Form.Control
                  as="select"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                >
                  <option value="">Select destination station</option>
                  {stations.map((eachStation) => (
                    <option key={eachStation.station} value={eachStation.station}>
                      {eachStation.station}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br></br>

              <Button className='form-btn' type="submit">
                Search
              </Button>
            </Form>
          </Col>

        <Col xs={12} md={9}>
          <div className='right-side-trains'>
          {searched && (
            <div className="results">
              {trains.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Train Name</th>
                      <th>Departure Time</th>
                      <th>Arrival Time</th>
                      <th>Distance</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trains.map((train, index) => (
                      <tr key={index}>
                        <td>{train.trainName}</td>
                        <td>{train.departureTime}</td>
                        <td>{train.arrivalTime}</td>
                        <td>{train.distance} Kms</td>
                        <td>Rs {train.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <h4 className="no-results text-center">No trains available for the selected route</h4>
              )}
            </div>
          )}
          </div>
        </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;