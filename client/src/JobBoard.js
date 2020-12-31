import React, { useState, useEffect } from 'react';
import { JobList } from './JobList';
import { loadJobs } from './requests'


export const JobBoard = props => {
  const [jobs, setJobs] = useState([]);

   useEffect(async () => {
    const jobsList = await loadJobs();
    setJobs(jobsList);
  }, []);

  return(
    <>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </>
  );
}

// export class JobBoard extends React.Component {

//   constructor(props){
//     super(props);
//     this.state={
//       jobs: []
//     }
//   }

//   async componentDidMount(){
//     const jobs = await loadJobs();
//     this.setState({ jobs });
//   }

//   render() {
//     const { jobs } = this.state;
//     return (
//       <div>
//         <h1 className="title">Job Board</h1>
//         <JobList jobs={jobs} />
//       </div>
//     );
//   }
// }

