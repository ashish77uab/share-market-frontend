import React, { useEffect, useState } from "react";
import { deleteTournament, getTournaments } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { imageRender } from "../../utils/helpers";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
import AddTournament from "../../components/modals/AddTournament";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import { Link } from "react-router-dom";
import RenderNoData from "../../components/layout/RenderNoData";

const Tournament = () => {
  const [isAddNewTourOpen, setIsAddNewTourOpen] = useState(false);
  const [tournament, setTournament] = useState(null);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isClosed = isAddNewTourOpen === false;
  const [fetchLoading, setFetchLoading] = useState(false);
  const [tournaments,setTournaments] = useState(null);
  const getAllTournaments = async () => {
    setFetchLoading(true)
    try {
      const res = await getTournaments();
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
       setTournaments(data);
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
    getAllTournaments();
  }, [isClosed]);
  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await deleteTournament(tournament._id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        toast.success(<ToastMsg title="Deleted Successfully" />);
        setIsConfirmedOpen(false);
        getAllTournaments();
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
          <h3 className="heading-3">All Tournaments </h3>
          <button
            onClick={() => setIsAddNewTourOpen(true)}
            className="btn-primary"
          >
            Add New Tournament{" "}
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
                  <th>View Teams</th>
                  <th>View Matches</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tournaments?.map((tournament, index) => (
                  <tr>
                    <td className="w-[80px]">{index + 1}</td>
                    <td>{tournament.name}</td>
                    <td>{tournament.color}</td>
                    <td>
                      <div className="flex justify-center">
                        <div className="w-14 h-14">
                          <img
                            className="w-full h-full object-contain"
                            src={imageRender(tournament?.icon)}
                            alt={tournament.name}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link
                        className="btn-primary"
                        to={`/dashboard/teams/${tournament._id}`}
                        state={{ name: tournament.name }}
                      >
                        View All Teams
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="btn-primary"
                        to={`/dashboard/matches/${tournament._id}`}
                        state={{ name: tournament.name }}
                      >
                        View All Matches
                      </Link>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <ActionButton
                          onClick={() => {
                            setTournament(tournament);
                            setIsAddNewTourOpen(true);
                          }}
                        >
                          {reactIcons.edit}
                        </ActionButton>
                        <DeleteButton
                          onClick={() => {
                            setTournament(tournament);
                            setIsConfirmedOpen(true);
                          }}
                        >
                          {reactIcons.delete}
                        </DeleteButton>
                      </div>
                    </td>
                  </tr>
                ))}
                {tournaments?.length < 1 && !fetchLoading  && <RenderNoData  title={'No tournaments available'} />}
                { fetchLoading && <div className="py-8 text-center font-semibold">Loading please wait....</div> }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddTournament
        isOpen={isAddNewTourOpen}
        tournament={tournament || null}
        closeModal={() => {
          setIsAddNewTourOpen(false);
          setTournament(null);
        }}
      />
      <DeleteConfirmation
        isOpen={isConfirmedOpen}
        closeModal={() => setIsConfirmedOpen(false)}
        handleDelete={handleDelete}
        title={"tournament"}
        loading={loading}
      />
    </>
  );
};

export default Tournament;
