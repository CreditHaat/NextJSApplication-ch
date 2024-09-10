import BLApplyPageFirst from "../../components/BLApplyPrimeSecondJourney/BLApplyPageFirst";
import ForSalaried from "../../components/BLApplyPrimeSecondJourney/ForSalaried";
import ForSelfEmployed from "../../components/BLApplyPrimeSecondJourney/ForSelfEmployed";
function page({ params, searchParams }) {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <BLApplyPageFirst params={params} searchParams={searchParams} />
      {/* <ForSalaried/> */}
      {/* <ForSelfEmployed/> */}
    </div>
  );
}

export default page
