import React from 'react'
import "./result.css";
import { useEffect,useState } from "react";
import { axiosAuthInstance,CONTEST_ID } from '../../Utils/AxiosConfig';
import { getToken} from '../../Utils/utils';
import { useNavigate } from 'react-router-dom';

const endPoint = `/core/${CONTEST_ID}/result/`


const Result = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(20);
  const [Resultdata,setResultData] = useState();
  const [top6,setTop6] = useState([]);  
  const [total,setTotal] = useState(0);
  const [right,setRight] = useState(0);

  

  useEffect(()=>{
    axiosAuthInstance.get(endPoint)
            .then((response) => {
                // console.log("enter in then ");
                if (response.status) {
                    // console.log("enter in then if ");
                    // console.log(response.data);
                    var personalR = response.data.personalRank;
                    var top6R = response.data.top6;
                    setResultData(Resultdata => ({
                      ...Resultdata,
                      ...personalR
                    }));
                    setTop6(top6 => ({
                      ...top6,
                      ...top6R
                    }));
                    setTotal(response.data.totalSub);
                    setRight(response.data.rightSub);
                    // console.log(response.data.totalSub)
                    // console.log(response.data.rightSub)
                    


                }
                else {
                    
                    // console.log("Error In fetch");
                }
            })
            .catch((error) => {
              console.clear();
                // console.log("enter in error ",error);

            })
  },[]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // console.log("Redirecting to login...");
      localStorage.clear();
      navigate('/leaderboard');
      window.location.reload(); 
    }, 20000); // 10 seconds
    const intervalId = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);


  const getFormatedTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    
    return formattedTime // Display formatted time in h:mm:ss format
  }


  return ( 
    <>
       <div className="contain min-h-[90vh]">
       <div className="result h-[-webkit-fill-available]  flex items-center justify-evenly">
        <h1 className="resulttitle m-4 text-blue-300">Your Result</h1>
        <div className="countdown">
          <p className='text-xl wrap text-slate-300'>Redirecting to leaderboard in <p className='text-2xl text-blue-600'>{countdown} seconds...</p> </p>
        </div>
          <div className="user_profile">
              <div className="profile">
                <p className="name">{Resultdata?.user1}</p>
              </div>

              <div className="score">
                {/* <!-- <p className="scoreitem">Rank : 5</p>
                <p className="scoreitem">Score: 10/10</p> --> */}
                <table className="tbles">
                  <thead>
                    <th>
                      Rank
                    </th>
                    <th id="TSub">
                      Score
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {Resultdata?.rank}
                      </td>
                      <td>
                      {Resultdata?.score}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="tbles" id='tb2'>
                  <thead>
                    <th >
                      Total <br/>
                      Submissions
                    </th>
                    <th id="TSub" >
                      Accuracy
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <td >
                        {total}
                      </td>
                      <td>
                        {((right/total)*100).toFixed(2)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- <p className="scoreitem">Questions Attempted: 7</p>
                <p className="scoreitem">Questions Asked: 7</p> --> */}
              </div>
          </div>
          {/* <!-- <div className="statistics">
                     
          </div>   --> */}
       </div>
       <div className="leaderboard h-[-webkit-fill-available] flex flex-col justify-around">

             <div className="leaderhead">
              <h1 className='text-blue-300'>WINNERS</h1>
             </div>       
             <div className="top3">
                  <div className="card1" id="card1">
                    <div className="circle">
                       <h2 className="place">2 </h2>
                    </div>
                    <div className="content">
                      
                      {/* <p>2nd</p> */}
                      <p id="m1"></p>
                      <p> 🥈 {top6?.[1]?.user1}</p>
                      <p>Score: {top6?.[1]?.score}</p> 
                    </div>
                  </div>

                  <div className="card1" id="card2">
                    <div className="circle">
                      
                        <h2 className="place">1</h2>
                    </div>
                    <div className="content">
                       {/* <p>1st</p> */}
                       
                       <p></p>
                       <p>🥇 {top6?.[0]?.user1}</p>
                       <p>Score: {top6?.[0]?.score}</p>
                    </div>
                  </div>

                  <div className="card1" id="card3">
                    <div className="circle">
                        <h2 className="place">3</h2>
                    </div>
                    <div className="content">
                      {/* <p>3rd</p> */}
                      <p></p>
                      <p>🥉{top6?.[2]?.user1}</p>
                      
                      <p>Score: {top6?.[2]?.score}</p>
                    </div>
                  </div>
             </div>
             <div className="top6">
                <div className="tble">
                    <table className="leader-table table-md table-hover" id="myTable">
                      <thead className='headers1'>
                        <tr className="headers" >
                          <th scope="col" className="userb p-2">Rank</th>
                          <th scope="col" className="userb p-2">Name</th>
                          <th scope="col" className="userb p-2">Score</th>
                          {/* <th scope="col" className="userb">Attempts</th> */}
                          <th scope="col" className="userb p-2">Time</th>
                        </tr>
                      </thead>
                      <tbody id="myTable">
                      
                        <tr className="usera px-2 py-2" >
                          <td className="px-5 py-3  ">{top6?.[3]?.rank}</td>
                          <td className="px-5 py-3  ">{top6?.[3]?.user1}</td>
                          <td className="px-5 py-3  ">{top6?.[3]?.score}</td>
                          <td className="px-5 py-3  ">{getFormatedTime(top6?.[3]?.lastUpdate)}</td>
                        </tr>
                        <tr className="usera" >
                          <td className="px-5 py-3  ">{top6?.[4]?.rank}</td>
                          <td className="px-5 py-3  ">{top6?.[4]?.user1}</td>
                          <td className="px-5 py-3  ">{top6?.[4]?.score}</td>
                          <td className="px-5 py-3  ">{getFormatedTime(top6?.[4]?.lastUpdate)}</td>
                        </tr>
                        <tr className="usera" >
                          <td className="px-5 py-3  ">{top6?.[5]?.rank}</td>
                          <td className="px-5 py-3  ">{top6?.[5]?.user1}</td>
                          <td className="px-5 py-3  ">{top6?.[5]?.score}</td>
                          <td className="px-5 py-3  ">{getFormatedTime(top6?.[5]?.lastUpdate)}</td>
                        </tr>
                     
                       </tbody>
                    </table>
                </div>
             </div>
       </div> 
    </div>
    </>
   );
}
 
export default Result;