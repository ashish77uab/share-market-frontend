import React, { useEffect, useState } from "react";
import { getAllMatchOfTournament, deleteMatch, distributeMoney, resetPlayerData } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import RenderNoData from "../../components/layout/RenderNoData";
import moment from "moment";
const Match = () => {
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)
  const location = useLocation();
  const { id } = useParams();
  const [isAddNewTeamOpen, setIsAddNewTeamOpen] = useState(false);
  const [team, setTeam] = useState(null);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
  const isClosed = isAddNewTeamOpen === false;
  const [matches, setMatches] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const getAllMatchesList = async () => {
    setFetchLoading(true)
    try {
      const res = await getAllMatchOfTournament({ id: id });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setMatches(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }finally{
      setFetchLoading(false)
    }
  };

  useEffect(() => {
    getAllMatchesList();
  }, [isClosed]);

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await deleteMatch(team._id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        toast.success(<ToastMsg title="Deleted Successfully" />);
        setIsConfirmedOpen(false);
        getAllMatchesList();
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }finally{
      setLoading(false)
    }
  };
  const handleDistributeMoney= async(matchId)=>{
    setLoading(true)
    try {
      const res = await distributeMoney(matchId);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        toast.success(<ToastMsg title="Distributed Successfully" />);
        getAllMatchesList();
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setLoading(false)
    }
  }
  const handleResetPlayerData= async(formData) => {
    setLoading(true)
    try {
      const res = await resetPlayerData(formData);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        toast.success(<ToastMsg title="Reset Successfully" />);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setLoading(false)
    }

  }
  return (
    <>
      <div>
        <header className="mb-4 flex items-center justify-between">
          <h3 className="heading-3">
            All Matches of {location?.state?.name}{" "}
          </h3>
          <Link to='/dashboard/matches/add' className="btn-primary">Add New Match </Link>
        </header>
        <div>
          <div className="overflow-x-auto w-full">
            <table>
              <thead>
                <tr>
                  <th className="w-[80px]">Sr.No</th>
                  <th>Home</th>
                  <th>Away</th>
                  <th>Time</th>
                  <th>Toss</th>
                  <th>Winning Amount</th>
                  <th>Entry Fees</th>
                  <th>Winning Percentage</th>
                  <th>Distribute Prize</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {matches?.map((match, index) => (
                  <tr>
                    <td className="w-[80px]">{index + 1}</td>
                    <td>{match.home?.name}</td>
                    <td>{match.away?.name}</td>
                    <td>{moment(match.time).format('MMM DD YYYY hh:mm a')}</td>
                    <td>{match.toss}</td>
                    <td>{match?.prize?.winningAmount}</td>
                    <td>{match?.prize?.entryFees}</td>
                    <td>{match?.prize?.winningPercentage}</td>
                    <td>
                     {match?.isDistributed ? <div className="text-center font-semibold text-sm text-green-600">Amount Distributed</div> :  <button onClick={() => handleDistributeMoney(match?._id)} className="btn btn-primary">Distribute</button>}
                    </td>
                   
                    <td>
                      <div className="flex justify-center gap-2">
                        <ActionButton onClick={() => navigate(`/dashboard/matches/update/${match._id}`)}>{reactIcons.edit}</ActionButton>
                        <DeleteButton
                          onClick={() => {
                            setTeam(match);
                            setIsConfirmedOpen(true);
                          }}
                        >
                          {reactIcons.delete}
                        </DeleteButton>
                        {match?.isDistributed && <DeleteButton
                          onClick={() => {
                            handleResetPlayerData({ home: match?.home?._id,away: match?.away?._id})
                          }}
                        >
                          {reactIcons.reset}
                        </DeleteButton>}
                      </div>
                    </td>
                  </tr>
                ))}
                {matches?.length < 1 && !fetchLoading && <RenderNoData title={'No matches available'} />}
                {fetchLoading && <div className="py-8 text-center font-semibold">Loading please wait....</div>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeleteConfirmation
        isOpen={isConfirmedOpen}
        closeModal={() => setIsConfirmedOpen(false)}
        handleDelete={handleDelete}
        title={"sub category"}
        loading={loading}
      />
    </>
  );
};

export default Match;
