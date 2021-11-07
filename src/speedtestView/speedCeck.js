
const ONE_MB = 1024 * 1024 * 10

async function uploadTest(){

    const dummy = new Blob([new ArrayBuffer(ONE_MB)], {type: 'application/octet-stream'})
    const res = await fetch('http://httpbin.org/post', {
        method: 'POST', 
        body: dummy,
        headers:
            {'Content-Type': 'application/octet-stream'}
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
}

uploadTest()