export const dynamic = "force-dynamic";
export const revalidate = 0;

import Announcements from "@/components/dashboards/announcements/Announcements";
import AttendanceChartContainer from "@/components/dashboards/charts/attendance-charts/AttendanceChartContainer";
import CountChartContainer from "@/components/dashboards/charts/count-chart-container/CountChartContainer";
import EventCalendarContainer from "@/components/dashboards/calendar/EventCalendarContainer";
import FinanceChart from "@/components/dashboards/charts/finance-charts/FinanceChart";
import UserCard from "@/components/ui/cards/UserCard";

import styles from "./adminPage.module.scss";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className={styles.page}>
      {/* LEFT */}
      <div className={styles.left}>
        {/* USER CARDS */}
        <div className={styles.userCards}>
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>

        {/* MIDDLE CHARTS */}
        <div className={styles.middleCharts}>
          <div className={styles.countChart}>
            <CountChartContainer />
          </div>

          <div className={styles.attendanceChart}>
            <AttendanceChartContainer />
          </div>
        </div>

        {/* BOTTOM CHART */}
        <div className={styles.financeChart}>
          <FinanceChart />
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
