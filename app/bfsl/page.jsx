import React from "react";
import NewPlPage from "../../components/NewPlApplyD/NewPlPage";
import NewPlPage2 from "../../components/NewPlApplyD/NewPlPage2";
import NewPlApplyDS from "../../components/NewPlApplyD/NewPlApplyDS";
import Bajaj_journey from "../../components/BajajFInservJourney/NewPlPage";

function page({ params, searchParams }) {
  return (
    <div>
      <Bajaj_journey params={params} searchParams={searchParams} />
      {/* <NewPlPage2/> */}
      {/* <NewPlApplyDS/> */}
    </div>
  );
}

export default page;
