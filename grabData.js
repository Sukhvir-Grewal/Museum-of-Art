fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/123`)
.then(res=>{
    return res.json()
})
.then(data=>console.log(data.primaryImageSmall))