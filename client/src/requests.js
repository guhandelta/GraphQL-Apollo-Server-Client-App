const endpointURL = 'http://localhost:9000/graphql'

export async function loadJob(id){
    const res = await fetch(endpointURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `
            query JobQuery($id: ID!){
              job(id: $id){
                id
                title
                company{
                  id
                  name
                }
                description
              }
            }`,
            variables: { id } //id: id | Se d in query variables in req as variables
        })
    });
    const resBody = await res.json();
    return resBody.data.job;
}

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