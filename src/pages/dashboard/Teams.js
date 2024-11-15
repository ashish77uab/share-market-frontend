import React, { useEffect, useState } from "react";
import { deleteTeam, getAllTeam } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { imageRender } from "../../utils/helpers";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddTeam from "../../components/modals/AddTeam";
import RenderNoData from "../../components/layout/RenderNoData";

const Teams = () => {
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)
  const location = useLocation();
  const { id } = useParams();
  const [isAddNewTeamOpen, setIsAddNewTeamOpen] = useState(false);
  const [team, setTeam] = useState(null);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
  const isClosed = isAddNewTeamOpen === false;
  const [teams, setTeams] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const getAllTeamsData = async () => {
    setFetchLoading(true)
    try {
      const res = await getAllTeam({ id: id });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setTeams(data);
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
    getAllTeamsData();
  }, [isClosed]);

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await deleteTeam(team._id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        toast.success(<ToastMsg title="Deleted Successfully" />);
        setIsConfirmedOpen(false);
        getAllTeamsData();
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }finally{
      setLoading(false)
    }
  };
  return (
    <>
      <div>
        <header className="mb-4 flex items-center justify-between">
          <h3 className="heading-3">
            All Teams of {location?.state?.name}{" "}
          </h3>
          <button
            onClick={() => setIsAddNewTeamOpen(true)}
            className="btn-primary"
          >
            Add New Team{" "}
          </button>
        </header>
        <div>
          <div className="overflow-x-auto w-full">
            <table>
              <thead>
                <tr>
                  <th className="w-[80px]">Sr.No</th>
                  <th>Name</th>
                  <th>Color</th>
                  <th>Image</th>
                  <th>View/Add Player</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teams?.map((team, index) => (
                  <tr>
                    <td className="w-[80px]">{index + 1}</td>
                    <td>{team.name}</td>
                    <td>{team.color}</td>
                    <td>
                      <div className="flex justify-center">
                        <div className="w-14 h-14">
                          <img
                            className="w-full h-full object-contain"
                            src={imageRender(team?.icon)}
                            alt={team.name}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                      <ActionButton
                      className={'text-xl'}
                        onClick={() => {
                        navigate(`/dashboard/player/${team?._id}`, {state:{
                          name:team?.name
                        }})
                        }}
                      >
                        {reactIcons.eye}
                      </ActionButton>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <ActionButton
                          onClick={() => {
                            setTeam(team);
                            setIsAddNewTeamOpen(true);
                          }}
                        >
                          {reactIcons.edit}
                        </ActionButton>
                        <DeleteButton
                          onClick={() => {
                            setTeam(team);
                            setIsConfirmedOpen(true);
                          }}
                        >
                          {reactIcons.delete}
                        </DeleteButton>
                      </div>
                    </td>
                  </tr>
                ))}
                {teams?.length < 1 && !fetchLoading && <RenderNoData title={'No Teams available'} />}
                {fetchLoading && <div className="py-8 text-center font-semibold">Loading please wait....</div>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddTeam
        isOpen={isAddNewTeamOpen}
        team={team || null}
        closeModal={() => {
          setIsAddNewTeamOpen(false);
          setTeam(null);
        }}
        id={id}
      />
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

export default Teams;
