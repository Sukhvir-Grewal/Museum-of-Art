import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // Parse the search history and generate a list of parsed search queries
  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  // Handle click on history item to re-run the search
  const historyClicked = (e, index) => {
    e.stopPropagation();
    const searchQuery = searchHistory[index];
    router.push(`/artwork${searchQuery}`);
  };

  // Handle click on the remove button to remove history item
  const removeHistoryClicked = (e, index) => {
    e.stopPropagation();
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  };

  return (
    <div>
      {parsedHistory.length === 0 ? (
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
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default History;