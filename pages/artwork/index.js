//This componet literally took me two day to figure out the problem
//I was about to give up!
//And the problem was that i was using "splice" insltead of "slice"
//Its always a spelling mistake'😂
import { useRouter } from "next/router"
import useSWR from 'swr'
import { useEffect, useState } from "react"
import { Card, Col, Pagination, Row } from "react-bootstrap"
import ArtworkCard from "@/components/ArtworkCard"
import Error from "next/error";

import validObjectIDList from "@/public/data/validObjectIDList.json"

const PER_PAGE = 12

function previousPage(page, setPage) {
    if (page > 1)
        setPage(page - 1);
    else
        setPage(1);
}

function next(page, setPage, artworkList) {
    if (page < artworkList.length)
        setPage(page + 1);
}

export default function Main() {
    const router = useRouter()
    let finalQuary = router.asPath.split('?')[1]
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuary}`)

    let [artworkList, setArtworkList] = useState(null)
    let [page, setPage] = useState(1)

    useEffect(() => {
            let result = []
            
            if (data) {
                let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
                for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                    const chunk = filteredResults.slice(i, i + PER_PAGE);
                    result.push(chunk);
            }
            setArtworkList(result)
        }
        setPage(1)
    }, [data])

    if (error)
        return <Error statusCode={404} />

    if (artworkList === null || typeof artworkList === 'undefined') {
        return null;
    }

    return (
        <>
            {artworkList && artworkList.length > 0 ? (
                <>
                    <Row className="gy-4">
                        {artworkList[page - 1].map((currentObjectID) => (
                            <Col lg={3} key={currentObjectID}>
                                <ArtworkCard objectID={currentObjectID} />
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col>
                            <Pagination>
                                <Pagination.Prev onClick={() => previousPage(page, setPage)} />
                                <Pagination.Item active>{page}</Pagination.Item>
                                <Pagination.Next onClick={() => next(page, setPage, artworkList)} />
                            </Pagination>
                        </Col>
                    </Row>
                </>
            ) : (
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title><h4>Nothing Here</h4></Card.Title>
                                <Card.Text>Try searching for something else</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
}