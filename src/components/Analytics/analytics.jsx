import React, { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import { getAllAnalytics } from "../../apis/analytics";
import ellipse from "../../assets/icons/ellipse.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Analytics() {
  const [analytics, setAnalytics] = useState({});
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  const fetchAllAnalytics = async () => {
    try {
      const response = await getAllAnalytics();
      setAnalytics(response);
    } catch (error) {
      console.log(error.message);
      setErrorFlag(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className={styles.analytics}>
      <h2 className={styles.title}>Analytics</h2>
      {analytics && analytics.status && (
        <div className={styles.outerContainer}>
          <div className={styles.container}>
            <div>
              <p>
                <img src={ellipse} /> Backlog Tasks
              </p>
              <p className={styles.numbers}>{analytics.status.backlog}</p>
            </div>
            <div>
              <p>
                <img src={ellipse} /> To-do Tasks
              </p>
              <p className={styles.numbers}>{analytics?.status?.toDo}</p>
            </div>
            <div>
              <p>
                <img src={ellipse} /> In-Progress Tasks
              </p>
              <p className={styles.numbers}>{analytics?.status?.inProgress}</p>
            </div>
            <div>
              <p>
                <img src={ellipse} /> Completed Tasks
              </p>
              <p className={styles.numbers}>{analytics?.status?.done}</p>
            </div>
          </div>
          <div className={styles.container}>
            <div>
              <p>
                <img src={ellipse} /> Low Priority
              </p>
              <p className={styles.numbers}>{analytics?.priority?.low}</p>
            </div>
            <div>
              <p>
                <img src={ellipse} /> Moderate Priority
              </p>
              <p className={styles.numbers}>{analytics?.priority?.moderate}</p>
            </div>
            <div>
              <p>
                <img src={ellipse} /> High Priority
              </p>
              <p className={styles.numbers}>{analytics?.priority?.high}</p>
            </div>
            <div>
              <p>
                <img src={ellipse} /> Due Date Tasks
              </p>
              <p className={styles.numbers}>{analytics?.dueDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
