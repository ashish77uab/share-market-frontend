import React, { useEffect, useState } from "react";
import { getUserStocks } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RenderNoData from "../../components/layout/RenderNoData";
import PurchaseStock from "../../components/modals/PurchaseStock";

const UserStocks = () => {
  const limit = 10
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const { userId } = useParams();
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [stock, setStocks] = useState(null);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
  const [stocks, setStockss] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const getUsersStocksData = async () => {
    setFetchLoading(true)
    try {
      const res = await getUserStocks({ page, limit, userId });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setStockss(data);
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
    if (userId) {
      getUsersStocksData();
    }
  }, [userId, page]);


  return (
    <>
      <div className="px-4">
        <header className="mb-4 flex items-center justify-between">
          <h3 className="heading-4">
            Stocks List
          </h3>
          <button
            onClick={() => setIsPurchaseOpen(true)}
            className="btn-primary"
          >
            Purchase
          </button>
        </header>
        <div>
          <div className="overflow-x-auto w-full">
            <table>
              <thead>
                <tr>
                  <th className="w-[80px]">Sr.No</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Type</th>
                  <th>Start Price</th>
                  <th>End Price</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stocks?.stocks.map((stock, index) => (
                  <tr>
                    <td className="w-[80px]">{index + 1}</td>
                    <td>{stock.name}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.actionType}</td>
                    <td>{stock.startPrice}</td>
                    <td>{stock.endPrice}</td>
                    <td>{stock?.amount}</td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <ActionButton
                          className={'text-xl'}
                          onClick={() => {

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
                            setStocks(stock);
                            setIsPurchaseOpen(true);
                          }}
                        >
                          {reactIcons.edit}
                        </ActionButton>
                        <DeleteButton
                          onClick={() => {
                            setStocks(stock);
                            setIsConfirmedOpen(true);
                          }}
                        >
                          {reactIcons.delete}
                        </DeleteButton>
                      </div>
                    </td>
                  </tr>
                ))}
                {stocks?.stocks?.length < 1 && !fetchLoading && <RenderNoData title="No stocks found." />}
                {fetchLoading && <div className="py-8 text-center font-semibold">Loading please wait....</div>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PurchaseStock
        isOpen={isPurchaseOpen}
        stock={stock || null}
        closeModal={() => {
          setIsPurchaseOpen(false);
          getUsersStocksData()
          setStocks(null);
        }}
      />
      {/* <DeleteConfirmation
        isOpen={isConfirmedOpen}
        closeModal={() => setIsConfirmedOpen(false)}
        handleDelete={handleDelete}
        title={"sub category"}
        loading={loading}
      /> */}
    </>
  );
};

export default UserStocks;
