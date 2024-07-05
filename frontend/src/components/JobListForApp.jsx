import React, { useContext, useState } from "react";
import styles from "./JobListForApp.module.css";
import ApplyJobModal from "./ApplyJobModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const JobListForApp = (props) => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [showApplyJobModal, setShowApplyJobModal] = useState(false);

  //   const { mutate } = useMutation({
  //     mutationFn: async () =>
  //       usingFetch(
  //         "/api/jobs/" + props.id,
  //         "DELETE",
  //         undefined,
  //         userCtx.accessToken
  //       ),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["books"]);
  //     },
  //   });

  return (
    <>
      {showApplyJobModal && (
        <ApplyJobModal
          id={props.id}
          company={props.company}
          title={props.title}
          jobDes={props.jobDes}
          setShowApplyJobModal={setShowApplyJobModal}
        />
      )}

      <div className={`row ${styles.jobs}`}>
        <div className="col-sm-3">{props.company}</div>
        <div className="col-sm-3">{props.title}</div>
        <div className="col-sm-4">{props.jobDes}</div>
        <button className="col-sm-2" onClick={() => setShowApplyJobModal(true)}>
          Apply
        </button>

        {/* {userCtx.role === "admin" ? (
          <>
            <button
              className="col-sm-2"
              onClick={() => setShowUpdateModal(true)}
            >
              update
            </button>
            <button className="col-sm-2" onClick={mutate}>
              delete
            </button>
          </>
        ) : (
          <>
            <button
              className="col-sm-2"
              onClick={() => setShowUpdateModal(true)}
              disabled
            >
              update
            </button>
            <button className="col-sm-2" onClick={mutate} disabled>
              delete
            </button>
          </>
        )} */}
      </div>
    </>
  );
};

export default JobListForApp;
