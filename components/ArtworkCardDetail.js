import useSWR  from 'swr'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Error from 'next/error'

import { favouritesAtom } from '@/store'
import { useState } from 'react'
import { useAtom } from 'jotai'

export default function ArtworkCardDetail({ objectID }) {
    const URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    const {data, error} = useSWR(URL)

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom) 
    const [showAdded, setShowAdded] = useState(true);

    if (error) {
        return <Error statusCode={404} />
    }
    if (data) {
        var id = `/artwork/${data.objectID}`

        const handleAddToFavourites = () =>{
            setFavouritesList((List) => [...List, data.objectID])
            setShowAdded(false)
        }

        const handleRemoveFromFavourites = () =>{
            setFavouritesList((List) => List.filter((id) => id !== data.objectID))
            setShowAdded(true)
        }
        return (
            <Card>
                {/* Renders the image only if it's available */}
                {
                    data.primaryImage && <Card.Img src={data.primaryImage} />
                }
                <Card.Body>
                    {
                        data.title ?
                            <Card.Title>{data.title}</Card.Title> :
                            <Card.Title><p>N/A</p></Card.Title>
                    }
                    {
                        data.objectDate ?
                            <Card.Text><b>Date:&nbsp;</b>{data.objectDate}</Card.Text> :
                            <Card.Text><b>Date:&nbsp;</b><p>N/A</p></Card.Text>
                    }
                    {
                        data.classification ?
                            <Card.Text><b>Classification:&nbsp;</b>{data.classification}</Card.Text> :
                            <Card.Text><b>Classification:&nbsp;</b><p>N/A</p></Card.Text>
                    }
                    {
                        data.medium ?
                            <Card.Text><b>Medium:&nbsp;</b>{data.medium}</Card.Text> :
                            <Card.Text><b>Medium:&nbsp;</b><p>N/A</p></Card.Text>
                    }
                    <br />
                    <br />
                    {
                        data.artistDisplayName ?
                            <Card.Text><b>Artist:&nbsp;</b>{data.artistDisplayName} ( <a href={data.artistULAN_URL} target="_blank" rel="noreferrer">wiki</a> ) </Card.Text> :
                            <Card.Text><b>Artist:&nbsp;</b>N/A</Card.Text>
                    }
                    {
                        data.creditLine ?
                            <Card.Text><b>Credit Line:&nbsp;</b>{data.creditLine}</Card.Text> :
                            <Card.Text><b>Credit Line:&nbsp;</b>N/A</Card.Text>
                    }
                    {
                        data.dimensions ?
                            <Card.Text><b>Dimensions:&nbsp;</b>{data.dimensions}</Card.Text> :
                            <Card.Text><b>Dimensions:&nbsp;</b>N/A</Card.Text>
                    }
                    {/* <Link href={id} passHref><Button>{data.objectID}</Button></Link> */}
                    {/* Rendering the Favorite button based on conditions */}
                    {
                        favouritesList  && favouritesList.includes(data.objectID)
                        ?
                            (<Button variant='dark' onClick={handleRemoveFromFavourites}>
                                + Favorite (added)
                            </Button>)
                        :
                            (showAdded && (
                               <Button variant='outline-dark' onClick={handleAddToFavourites}>
                                    + Favorites
                               </Button> 
                            ))
                    }
                </Card.Body>
            </Card>
        )
    } else {
        return null
    }
}