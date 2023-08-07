import { Row, Col, Card, Pagination } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import ArtworkCard from "@/components/ArtworkCard";

function FavouritesPage() {
  const [favouritesList] = useAtom(favouritesAtom);

  if(!favouritesList) return null

  return (
    <div>
      {favouritesList.length === 0 ? (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h4>Nothing Here</h4>
                </Card.Title>
                <Card.Text>Try searching for something else</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="gy-4">
          {favouritesList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default FavouritesPage;