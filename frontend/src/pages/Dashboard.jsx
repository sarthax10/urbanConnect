import React from 'react';
import { Layout, Tabs } from 'antd';
import {
  AppstoreOutlined,
  CalendarOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from '@clerk/clerk-react';

// Components
import WelcomeBanner from '../components/DashboardComponents/WelcomeBanner';
import StatsOverview from '../components/DashboardComponents/StatsOverview';
import TopProfessionalsPanel from '../components/DashboardComponents/TopProfessionalsPanel';
import CurrentAppointments from '../components/DashboardComponents/CurrentAppointments';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const Dashboard = () => {
  const { user } = useUser();

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <Layout className="min-h-screen bg-black text-white">
          {/* Header */}
          

          {/* Content */}
          <Content className="bg-white text-black py-10 px-6 md:px-12 rounded-t-xl">
            <div className="max-w-7xl mx-auto space-y-10">
              <WelcomeBanner name={user?.firstName} />
              <StatsOverview />

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                <Tabs
defaultActiveKey="1"
  type="line"
  size="large"
  className="custom-black-tab"
  tabBarStyle={{
    marginBottom: 24,
    fontWeight: 600,
  }}
>

                  <TabPane
                    key="1"
                    tab={
                      <span className="flex items-center gap-1">
                        <AppstoreOutlined /> Most Booked Professionals
                      </span>
                    }
                  >
                    <TopProfessionalsPanel />
                  </TabPane>

                  <TabPane
                    key="2"
                    tab={
                      <span className="flex items-center gap-1">
                        <CalendarOutlined /> Upcoming Bookings
                      </span>
                    }
                  >
                    <CurrentAppointments />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </Content>
        </Layout>
      </SignedIn>
    </>
  );
};

export default Dashboard;
