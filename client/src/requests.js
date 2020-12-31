const endpointURL = 'http://localhost:9000/graphql'

export async function loadJobs(){
    const res = await fetch(endpointURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `{
              jobs{
                id
                title
                company{
                  id
                  name
                }
              }  
            }`
        })
    });
    const resBody = await res.json();
    return resBody.data.jobs;
}