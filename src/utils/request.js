export default async function(url,data){
    var res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    })
    var data=await res.json()
    if(data.result!=200){
        throw new Error(data.message)
    }
    return data
}