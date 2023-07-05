fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?=hello`)
.then(res=>{
    return res.json()
})
.then(data=>console.log(data))