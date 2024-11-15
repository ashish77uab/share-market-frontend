import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addUserTeam, getEvents, getMatch, getUserMatchTeam, joinEvent } from "../api/api";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { numberWithCommas } from "../utils/helpers";
import moment from "moment";
import { RoleConstant } from "../utils/constants";
import { reactIcons } from "../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import ViewUserTeam from "../components/modals/ViewUserTeam";
import { updateUserWallet } from "../redux/features/authSlice";

const PreviewPlayer = ({ player, team }) => {
  return (
    <div className=" flex flex-col text-center items-center w-20 relative ">
      {team && (
        <>
          {team?.captain === player?._id && <div className="absolute top-[-10px] right-[-6px] w-6 h-6 rounded-full flex-center bg-black text-white text-xs font-semibold">
            <div> C</div>
          </div>}
          {team?.viceCaptain === player?._id && <div className="absolute top-[-10px] right-[-6px] w-6 h-6 rounded-full flex-center bg-black text-white text-xs font-semibold">
            <div>VC</div>
          </div>}

        </>
      )}
      <img className="w-10 h-10 object-cover mr-1" src={player.image || '/images/user.png'} alt="user" />
      <div>
        <p className="text-[12px] line-clamp-1 bg-black p-1 text-white rounded-sm">{player.name}</p>
        <div className="text-sm text-white font-semibold">{player?.credits} CR</div>
      </div>
    </div>
  )
}
const MatchDetail = () => {
  const dispatch=useDispatch()
  const [isUserTeamPreviewOpen, setIsUserTeamPreviewOpen] = useState(false)
  const [userTeamPreviewData, setUserTeamPreviewData] = useState({
    item: '',
    user: ''
  })
  const [isView, setIsView] = useState(null)
  const { user } = useSelector(state => state?.auth)
  const [captain, setCaptain] = useState(null)
  const [viceCaptain, setViceCaptain] = useState(null)
  const [next, setNext] = useState(false)
  const [selectedRole, setSelectedRole] = useState(RoleConstant?.WicketKeeper)
  const [allPlayers, setAllPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [match, setMatch] = useState(null);
  const [userMatchTeam, setUserMatchTeam] = useState([]);
  const { matchId } = useParams();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const allPoints = selectedPlayers?.reduce((acc, p) => acc + Number(p?.credits), 0)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamNumber, setTeamNumber] = useState(null)
  const [events, setEvents] = useState([])
  const handleSelectPlayer = (player) => {
    if (selectedPlayers?.find(p => p._id === player?._id)) {
      setSelectedPlayers(selectedPlayers.filter(p => p._id !== player._id))
      if (player?._id === captain) {
        setCaptain(null)
      } else if (player?._id === viceCaptain) {
        setViceCaptain(null)
      }
    } else {
      if (selectedPlayers?.length === 11) {
        toast.error('Maximum 11 players can be selected');
        return
      } else {
        setSelectedPlayers([...selectedPlayers, player])
      }
    }

  }
  const getMatchDetail = async (id) => {
    setFetchLoading(true)
    try {
      const res = await getMatch(id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setMatch(data);
        setAllPlayers([...data?.home?.players, ...data?.away?.players])
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setFetchLoading(false)
    }
  };
  const getEventsDetail = async (id) => {
    setFetchLoading(true)
    try {
      const res = await getEvents(id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setEvents(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setFetchLoading(false)
    }
  };
  const getUserMatchTeams = async (matchId, userId) => {
    setFetchLoading(true)
    try {
      const res = await getUserMatchTeam({ matchId, userId });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setUserMatchTeam(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setFetchLoading(false)
    }
  };
  useEffect(() => {
    if (matchId && user?._id) {
      getMatchDetail(matchId);
      getUserMatchTeams(matchId, user?._id)
      getEventsDetail(matchId)
    }

  }, [matchId, user])
  const homeSelectedPlayer = selectedPlayers?.filter(p => p?.team === match?.home?._id)?.length
  const awaySelectedPlayer = selectedPlayers?.filter(p => p?.team === match?.away?._id)?.length
  const handleReset = () => {
    setCaptain(null)
    setViceCaptain(null)
    setSelectedPlayers([])
    setNext(false)
    setSelectedTeam(null)
    setTeamNumber(null)
  }
  const handleCreateTeam = async () => {
    if (!captain || !viceCaptain) {
      toast.error(<ToastMsg title={'Please select captain and vice captain'} />);
      return
    }
    setUpdateLoading(true)
    try {
      const formData = {
        match: matchId,
        user: user?._id,
        captain: captain,
        viceCaptain: viceCaptain,
        players: selectedPlayers?.map((player) => player?._id),
      }
      const res = await addUserTeam(formData);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        toast.success(<ToastMsg title={'Created Successfully'} />);
        handleReset()
        getUserMatchTeams(matchId, user?._id)
        setIsView(1)
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setUpdateLoading(false)
    }
  }
  const handleJoinEvent = async () => {
    setUpdateLoading(true)
    if (!selectedTeam || !teamNumber){
      toast.error(<ToastMsg title={'Please select team first'} />);
      return 
    }
   
    try {
      const formData = {
        match: matchId,
        user: user?._id,
        team: selectedTeam,
        teamNumber: teamNumber,
        entryFees: Number(match?.prize?.entryFees)
      }
      const res = await joinEvent(formData);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        toast.success(<ToastMsg title={'Joined  Successfully'} />);
        handleReset()
        const walletAmount = user?.wallet?.amount
        const newWalletAmount = walletAmount - Number(match?.prize?.entryFees)
        dispatch(updateUserWallet(newWalletAmount))
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setUpdateLoading(false)
    }
  }
  const filledSpot = match?.eventCount?.[0]?.eventCount || 0
  const totalSpots = Math.floor(match?.prize?.winningAmount / match?.prize?.entryFees)
  const perCentage = filledSpot * 100 / totalSpots
  return (
    <>
      <div className="container py-10">
        <div className="py-6 px-6 rounded-md bg-white">
          <div className="flex justify-between items-start gap-2 ">
            <div className="flex-grow">
              <div className=" flex items-center gap-1 ">
                <img className="w-8 h-8 object-contain mr-1" src={match?.home?.icon} alt="" />
                <p>{match?.home?.name}</p>
                <b className="self-center">Vs</b>
                <img className="w-8 h-8 object-contain mr-1" src={match?.away?.icon} alt="" />
                <p>{match?.away?.name}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className={`
            font-semibold
            ${match?.status === 'Live' && 'text-red-500'}
            ${match?.status === 'Completed' && 'text-green-500'}
            ${match?.status === 'Pending' && 'text-gray-500'}
            `}>
                  {match?.status === 'Live' && 'Match is live'}
                  {match?.status === 'Completed' && 'Match is Completed'}
                  {match?.status === 'Pending' && 'Match not started yet'}

                </div>
              </div>

            </div>

            {!match?.isDistributed ? filledSpot === totalSpots ? <div className="bg-green-800 px-4 py-2 rounded-lg text-sm text-white" >Contest Filled</div> : <div className="flex flex-col items-end gap-1">
              <button onClick={handleJoinEvent} className="btn-primary btn-sm ">Join</button>
            </div> :null}
          </div>
          <div className="flex items-start gap-1 justify-between mt-4">
            <div>
              <p>Starts at <b>{moment(match?.time)?.format('DD MMM, HH:mm')}</b> </p>
              <p>Pool Prize  Rs.<b> {numberWithCommas(match?.prize?.winningAmount)}</b> </p>
            </div>
            <div>
              <p>Entry Fees  Rs.<b> {match?.prize?.entryFees}</b> </p>
              <p>Winnings  <b> {match?.prize?.winningPercentage}%</b> </p>
            </div>

          </div>
          {!match?.isDistributed && <div className="mt-4">
            <div className="flex justify-between gap-2 mb-2">
              <span className="text-sm">{numberWithCommas(filledSpot)} spot filled</span>
              <span className="text-sm">{numberWithCommas(totalSpots)} total spots</span>
            </div>
            <div className="h-[8px] rounded-full bg-gray-200">
              <div style={{ width: `${perCentage}%` }} className="h-full rounded-full bg-green-700"></div>
            </div>

          </div>}
          <div className="mt-4 flex items-center gap-4">
            {!match?.isDistributed  &&<button onClick={() => setIsView(0)} className={` ${isView === 0 ? 'btn-primary' : 'btn-outline-primary'}`}>Create Team</button>}
            <button onClick={() => { match?.isDistributed ? setIsView(prev=>prev===1?null :1) :  setIsView(1)}} className={` ${isView === 1 ? 'btn-primary' : 'btn-outline-primary'}`}>View Team</button>
          </div>
        </div>
        {isView === 1 &&
          <div className="grid grid-cols-2 gap-10 mt-4">
            {
              userMatchTeam?.map((item, upperIndex) => {
                return (
                  <div>
                    <h4 className="heading-4 text-center"> Team {upperIndex + 1}</h4>
                    <div key={item?._id} className="space-y-4 p-6 min-h-[440px] rounded-md bg-green-700 my-4 relative">
                      {!match?.isDistributed&&  <div className="absolute right-2 top-2 flex items-center gap-2">
                        <span className="font-semibold text-white">Select Team</span>
                          <div onClick={() => {
                          setSelectedTeam(prev => prev ? prev === item?._id ? null : item?._id : item?._id)
                          setTeamNumber(upperIndex + 1)
                        }} className="w-10 h-10 rounded-full flex-center  bg-white cursor-pointer"> 
                        {item?._id === selectedTeam &&
                          <span className="text-2xl text-green-600">
                            {reactIcons.check}
                          </span>}
                          </div>
                      </div>}
                      <div className="flex justify-center gap-4 flex-wrap">
                        {item?.players?.filter((player) => player.role === RoleConstant?.WicketKeeper)?.map((player, index) => (
                          <PreviewPlayer team={item} key={index} player={player} />
                        ))}
                      </div>
                      <div className="flex justify-center gap-4 flex-wrap">
                        {item?.players?.filter((player) => player.role === RoleConstant?.Batsman)?.map((player, index) => (
                          <PreviewPlayer team={item} key={index} player={player} />
                        ))}
                      </div>
                      <div className="flex justify-center gap-4 flex-wrap">
                        {item?.players?.filter((player) => player.role === RoleConstant?.AllRounder)?.map((player, index) => (
                          <PreviewPlayer team={item} key={index} player={player} />
                        ))}
                      </div>
                      <div className="flex justify-center gap-4 flex-wrap">
                        {item?.players?.filter((player) => player.role === RoleConstant?.Bowler)?.map((player, index) => (
                          <PreviewPlayer team={item} key={index} player={player} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        }
        {isView === 0 &&
          <div className="grid grid-cols-2 gap-10 my-4 ">
            <div className="w-full">
              <div className="flex items-center w-full gap-4 ">
                {Object.keys(RoleConstant)?.map((role) => {
                  return (
                    <div onClick={() => setSelectedRole(RoleConstant[role])} className={`flex-1 cursor-pointer text-center py-2 text-sm px-4 ${selectedRole === RoleConstant[role] ? 'btn-primary' : 'btn-outline-primary'}`}>{RoleConstant[role]}</div>
                  )
                })}

              </div>
              <div>
                <div className="flex gap-2 py-2">
                  <div className="flex-grow">Players</div>
                  <div className="text-center min-w-[80px]">Points</div>
                  <div className="text-center min-w-[80px]">Credits</div>
                  <div className="text-center min-w-[40px]"></div>
                </div>
                <div className="space-y-1">
                  {allPlayers?.filter((player) => player.role === selectedRole)?.map((player, index) => (
                    <div onClick={() => handleSelectPlayer(player)} key={index} className={`px-4 py-4  flex items-center gap-2 rounded-md cursor-pointer ${selectedPlayers?.find(p => p._id === player?._id) ? 'bg-amber-100' : 'bg-white'}`}>
                      <div className="flex-grow gap-2 flex items-center">
                        <img className="w-10 h-10 object-cover mr-1" src={player.image || '/images/user.png'} alt="user" />
                        <div>
                          <p>{player.name}</p>
                          <p className="text-xs text-muted">selected by {player?.selectedPercentage || 0}%</p>
                          <div className="flex items-center gap-1">
                            <div className={`${player.isPlaying ? 'bg-green-500' : 'bg-red-500'} w-[10px] h-[10px] rounded-full`}></div>
                            <div className="text-xs text-muted">{player.isPlaying ? 'playing' : 'not-playing'}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center min-w-[80px]">{player?.points}</div>
                      <div className="text-center min-w-[80px]">{player?.credits}</div>
                      <div className="text-center min-w-[40px]">{selectedPlayers?.find(p => p._id === player?._id) ? <span className="text-2xl text-green-600">{reactIcons?.plus}</span> : <span className="text-2xl text-red-600">{reactIcons?.minus}</span>}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10  bg-white p-4">
              <div className="flex items-center justify-between py-2">
                <span>Total Points</span>
                <div className="font-semibold"><span className="text-green-700">{allPoints}</span>/ 100</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Selected Players</span>
                <div className="font-semibold"><span className="text-green-700">{selectedPlayers?.length}</span>/ 11</div>
              </div>
              <div className="flex justify-between py-2">
                <div className="flex-1 ">
                  <div>{match?.home?.name}</div>
                  <b>{homeSelectedPlayer}</b>
                </div>
                <div className="flex-1 text-right">
                  <div>{match?.away?.name}</div>
                  <b>{awaySelectedPlayer}</b>
                </div>
              </div>
              <div>
              </div>
              {
                next ?
                  <div>
                    <div className="flex gap-2 py-2">
                      <div className="flex-grow">Players</div>
                      <div className="text-center min-w-[80px]">Captain</div>
                      <div className="text-center min-w-[80px]">Vice Captain</div>
                    </div>
                    <div className="space-y-1">
                      {selectedPlayers?.map((player, index) => (
                        <div key={index} className={`px-4 py-4  flex items-center gap-2 rounded-md cursor-pointer bg-amber-100`}>
                          <div className="flex-grow gap-2 flex items-center">
                            <img className="w-10 h-10 object-cover mr-1" src={player.image || '/images/user.png'} alt="user" />
                            <div>
                              <p>{player.name}</p>
                              <p className="text-xs text-muted">selected by {player?.selectedPercentage || 0}%</p>
                            </div>
                          </div>
                          <div className="text-center min-w-[80px] flex justify-center">
                            <button disabled={viceCaptain === player?._id} onClick={() => setCaptain(prev => prev === player?._id ? null : player?._id)} className={`w-8 h-8  shadow-2xl rounded-full text-sm font-semibold flex-center ${captain === player?._id ? 'bg-green-700 text-white ' : 'bg-white'}`} >C</button>
                          </div>
                          <div className="text-center min-w-[80px] flex justify-center">
                            <button disabled={captain === player?._id} onClick={() => setViceCaptain(prev => prev === player?._id ? null : player?._id)} className={`w-8 h-8  shadow-2xl rounded-full text-sm font-semibold flex-center ${viceCaptain === player?._id ? 'bg-green-700 text-white ' : 'bg-white'}`} >VC</button>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  :
                  <div className="space-y-2 p-6 min-h-[420px] rounded-md bg-green-700 my-4">
                    <div className="flex justify-center gap-3 flex-wrap">
                      {selectedPlayers?.filter((player) => player.role === RoleConstant?.WicketKeeper)?.map((player, index) => (
                        <PreviewPlayer key={index} player={player} />
                      ))}
                    </div>
                    <div className="flex justify-center gap-3 flex-wrap">
                      {selectedPlayers?.filter((player) => player.role === RoleConstant?.Batsman)?.map((player, index) => (
                        <PreviewPlayer key={index} player={player} />
                      ))}
                    </div>
                    <div className="flex justify-center gap-3 flex-wrap">
                      {selectedPlayers?.filter((player) => player.role === RoleConstant?.AllRounder)?.map((player, index) => (
                        <PreviewPlayer key={index} player={player} />
                      ))}
                    </div>
                    <div className="flex justify-center gap-3 flex-wrap">
                      {selectedPlayers?.filter((player) => player.role === RoleConstant?.Bowler)?.map((player, index) => (
                        <PreviewPlayer key={index} player={player} />
                      ))}
                    </div>
                  </div>
              }

              <div className="py-4">
                {
                  next ? <div className="flex gap-2 items-center">
                    <button onClick={() => setNext(false)} className="btn-primary">View Team</button>
                    <button onClick={handleCreateTeam} className="btn-primary">Create</button>
                  </div> : <button disabled={homeSelectedPlayer + awaySelectedPlayer < 11} onClick={() => setNext(true)} className="btn-primary">Next</button>
                }
              </div>


            </div>
          </div>
        }

        <div className="mt-10">
          <h4 className="heading-4 mb-2">Leaderboard</h4>
          <ul className="max-w-xl bg-white rounded-md border border-zinc-200 ">
            <div className="flex gap-2 px-4 py-2">
              <div className="flex-grow">Player</div>
              <div className="text-center min-w-[80px]">Point</div>
              <div className="text-center min-w-[80px]">Rank</div>
            </div>
            {events?.map((event, index) => (
              <li onClick={() => {
                setUserTeamPreviewData({
                  item: event?.team,
                  user: event?.user
                })
                setIsUserTeamPreviewOpen(true)
              }} key={index} className={`px-4 py-4  flex items-center gap-2  cursor-pointer border-b border-b-zinc-200 ${event?.isCurrentUser ? 'bg-amber-100' : 'bg-white'} `}>
                <div className="flex-grow gap-2 flex items-center">
                  <img className="w-10 h-10 object-cover rounded-full overflow-hidden mr-1" src={event?.user?.profileImage || '/images/user.png'} alt="user" />
                  <div>
                    <p>{event?.user?.fullName} <span className="text-muted text-sm">( T{event?.teamNumber}</span> ) </p>
                    {match?.isDistributed && 
                       <p className={ `${event?.isWon ?'text-green-600' :'text-red-600'} font-semibold text-sm`}>
                        Rs. {event?.isWon ? numberWithCommas(event?.amount) : match?.prize?.entryFees} {event?.isWon ?'won' :'lost'}
                      </p>}
                  </div>
                </div>
                <div className="flex  text-center flex-col gap-2 min-w-[80px]">
                  <div>
                    <b className="text-gray-700 mr-1">{event?.teamScore} pts</b>
                  </div>
                </div>
                <div className="flex text-center  flex-col gap-2 min-w-[80px]">
                  <b className="text-gray-700 mr-1">{event?.rank}</b>
                </div>

              </li>
            ))}

          </ul>
        </div>

      </div>
      <ViewUserTeam
        isOpen={isUserTeamPreviewOpen}
        item={userTeamPreviewData?.item}
        user={userTeamPreviewData?.user}
        closeModal={() => {
          setIsUserTeamPreviewOpen(false)
        }}
      />
    </>
  );
};

export default MatchDetail
