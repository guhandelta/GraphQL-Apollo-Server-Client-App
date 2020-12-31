const db = require('./db')

const Query = {
    // Thie 1st arg to a resolver() is the parent value, which in this case is the root obj
    // The parent element for the Company is job, so passing in job, similarly, since Query being the root-
    //- query, the parent object to be passed innto the resolver is the root Obj
    // args will contain the args passed in the GraphQL query
    job: (root, { id }) => db.jobs.get(id),
    jobs: () => db.jobs.list(),
};

// Resolvers should adhere to the schema and as Company is a field of Job Type, a new resolver Obj should be defn-
//- to resolve the fields of a Job, the field that needs ot be resolved is the Company
const Job = {
    // Since a company needs to be resolved for a job, resolver() would require the parent Obj to accomplish it
    // The Job Obj passed to teh company resolver is the response for invoking the parent resolver in the hierarchy
    
    // When a client requests for a company, the Jobs resolver will be called, which will return an array of Job-
    //- objects. The GraphQL engine will traverse through all these objects to invoke the company resolver for-
    //- the Obj type 
    company: (job) => db.companies.get(job.companyId)
};

module.exports = {
    Query,
    Job
};