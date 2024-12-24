import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const features = [
  { title: "Real-time Monitoring", description: "Monitor your manufacturing processes in real-time, ensuring smooth operations and immediate identification of any anomalies or inefficiencies." },
  { title: "Predictive Maintenance", description: "Leverage advanced analytics to predict maintenance needs before they occur, minimizing downtime and optimizing equipment performance." },
  { title: "Data-driven Insights", description: "Gain valuable insights from your data, allowing you to make informed decisions and implement targeted improvements to enhance overall efficiency and productivity." }
];


const FeatureSection = () => {
  return (
    <section className="feature-section py-5">
      <Container>
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={4}>
              <Card 
               className="feature-item text-center rounded-4 m-1"
               data-aos="fade-up"
               data-aos-duration="500"
               data-aos-delay="1000"
                style={{height:'100%'}}
               >
                <Card.Body >
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeatureSection;
