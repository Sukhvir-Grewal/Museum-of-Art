import { Card, CardGroup } from "react-bootstrap";
export default function Home() {
  return (
    <CardGroup>
      <Card style={{ width: '30rem' }}>
        <Card.Img src="/Beeju.png" />
      </Card>
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Who Are They</Card.Title>
          <Card.Text>Three Beejus one Not Beeju</Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  )
}
