import  useSWR  from 'swr'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Error from 'next/error'

export default function ArtworkCard({ objectID }) {
    const URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    const {data, error} = useSWR(URL)

    if (error) {
        // if an "error" occurs when making the SWR request, 
        // render the "Error" component from "next/error", 
        // ie: <Error statusCode={404} />
        return <Error statusCode={404} />
    }
    if (data) {
        var id = `/artwork/${data.objectID}`
        return (
            <Card>
                {
                        data.primaryImageSmall ?
                         <Card.Img src={data.primaryImage} />:
                         <Card.Img src={'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
                }
                <Card.Body>
                    {
                        data.title ?
                            <Card.Title>{data.title}</Card.Title> :
                            <Card.Title>N//A</Card.Title>
                    }
                    {
                        data.objectDate ?
                            <Card.Text><b>Date:&nbsp;</b>{data.objectDate}</Card.Text> :
                            <Card.Text><b>Date:&nbsp;</b>N//A</Card.Text>
                    }
                    {
                        data.classification ?
                            <Card.Text><b>Classification:&nbsp;</b>{data.classification}</Card.Text> :
                            <Card.Text><b>Classification:&nbsp;</b>N//A</Card.Text>
                    }
                    {
                        data.medium ?
                            <Card.Text><b>Medium:&nbsp;</b>{data.medium}</Card.Text> :
                            <Card.Text><b>Medium:&nbsp;</b>N//A</Card.Text>
                    }
                    <Link href={id} passHref><Button>{data.objectID}</Button></Link>
                </Card.Body>
            </Card>
        )
    }else{
        return null
    }
}