import React, { useEffect, useState } from "react";
import { getTournaments, getTopMatches } from "../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import ProductCardSkeleton from "../components/cards/ProductCardSkeleton";
import CategoryCardSkeleton from "../components/cards/CategoryCardSkeleton";
import { reactIcons } from "../utils/icons";
import { Link } from "react-router-dom";
import RenderNoData from "../components/layout/RenderNoData";
import TournamentSwiper from "../components/swipers/TournamentSwiper";
import TopMatchSwiper from "../components/swipers/TopMatchSwiper";
const Home = () => {
  const [tournaments, setTournaments] = useState([]);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [topMatches, setTopMatches] = useState([]);
 

  const getAllTournaments = async () => {
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
    } finally {
      setSkeletonLoading(false)
    }
  };
  const getAllTopMatches = async () => {
    try {
      const res = await getTopMatches();
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setTopMatches(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setSkeletonLoading(false)
    }
  };
  useEffect(() => {
     getAllTournaments()
    getAllTopMatches()
  }, []);
  return (
    <section className=" pt-8 pb-20 space-y-4">
      <div className="container">
        <header className="py-4 flex justify-between gap-4  mb-4">
          <h4 className="heading-3">All Tournaments</h4>
        </header>
        <div className="grid md:grid-cols-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 gap-1">
          {skeletonLoading ? (
            < >
              {Array(4)
                .fill(2)
                .map((_item, index) => (
                  <CategoryCardSkeleton key={index} />
                ))}
            </>
          ) : (
              tournaments?.length> 0 ?    <TournamentSwiper data={tournaments} /> :<RenderNoData title={'No tournaments available'}/>
          )}
        </div>
      </div>
      <div className="container">
        <header className="py-4 flex justify-between gap-4  mb-4">
          <h4 className="heading-3">Top Matches</h4>
        </header>
        <div className="grid md:grid-cols-2 grid-cols-2  gap-1">
          {skeletonLoading ? (
            <>
              {Array(4)
                .fill(2)
                .map((_item, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
            </>
          ) : (
              topMatches?.length > 0 ? <TopMatchSwiper data={topMatches} /> :<RenderNoData title={'No featured products available'}/>
            
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
