import { useRouter } from "next/router"
import useSWR from 'swr'
import { useEffect, useState } from "react"
import { Card, Col, Pagination, Row } from "react-bootstrap"
import ArtworkCard from "@/components/ArtworkCard"
import { Error } from "next/error";

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

    let [artworkList, setArtworkList] = useState([])
    let [page, setPage] = useState(1)

    useEffect(() => {
        if (data) {
            let result = []
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.splice(i, i + PER_PAGE)
                result.push(chunk)
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
            {artworkList != null && (
                <Row className="gy-4">
                    {
                        artworkList.length > 0 ? (
                            artworkList[page - 1].map((currentObjectID) => (
                                <Col lg={3} key={currentObjectID}>
                                    <ArtworkCard objectID={currentObjectID} />
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title><h4>Nothing Here</h4></Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            )}
            {
                artworkList && artworkList.length > 0 && (
                    <Row>
                        <Col>
                            <Pagination>
                                <Pagination.Prev onClick={() => previousPage(page, setPage)} />
                                <Pagination.Item active />{page}
                                <Pagination.Next onClick={() => next(page, setPage, artworkList)} />
                            </Pagination>
                        </Col>
                    </Row>
                )
            }
        </>
    )
}   