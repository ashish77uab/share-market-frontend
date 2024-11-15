import React, { useEffect, useState } from "react";
import { getAllMatchOfTournament, deleteMatch, distributeMoney, getAllPrizePyramid, deletePrizePyramid } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import RenderNoData from "../../components/layout/RenderNoData";
import moment from "moment";
const PrizePyramidList = () => {
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)
  const location = useLocation();
  const { id } = useParams();
  const [isAddNewTeamOpen, setIsAddNewTeamOpen] = useState(false);
  const [prize, setPrize] = useState(null);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
  const isClosed = isAddNewTeamOpen === false;
  const [prizes, setPrizes] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const getAllPrizeList = async () => {
    setFetchLoading(true)
    try {
      const res = await getAllPrizePyramid();
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setPrizes(data);
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
    getAllPrizeList();
  }, []);

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await deletePrizePyramid(prize._id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        toast.success(<ToastMsg title="Deleted Successfully" />);
        setIsConfirmedOpen(false);
        getAllPrizeList();
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
            All Prizes Pyramid Listing 
          </h3>
          <Link to='/dashboard/prize/add' className="btn-primary">Add New Pyramid  </Link>
        </header>
        <div>
          <div className="overflow-x-auto w-full">
            <table>
              <thead>
                <tr>
                  <th className="w-[80px]">Sr.No</th>
                  <th>Amount</th>
                  <th>Entry Fess</th>
                  <th>Winning Percentage</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {prizes?.map((prizes, index) => (
                  <tr>
                    <td className="w-[80px]">{index + 1}</td>
                    <td>{prizes.winningAmount}</td>
                    <td>{prizes.entryFees}</td>
                    <td>{prizes.winningPercentage}</td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <ActionButton onClick={() => navigate(`/dashboard/prize/update/${prizes._id}`)}>{reactIcons.edit}</ActionButton>
                        <DeleteButton
                          onClick={() => {
                            setPrize(prizes);
                            setIsConfirmedOpen(true);
                          }}
                        >
                          {reactIcons.delete}
                        </DeleteButton>
                      </div>
                    </td>
                  </tr>
                ))}
                {prizes?.length < 1 && !fetchLoading && <RenderNoData title={'No prizes available'} />}
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
        title={"Prize"}
        loading={loading}
      />
    </>
  );
};

export default PrizePyramidList;
