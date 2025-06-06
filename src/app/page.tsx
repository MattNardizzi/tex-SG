'use client';

import DashboardHUD from '../components/panels/DashboardHUD';
import withPasswordProtect from '../components/withPassword';

function Home() {
  return <DashboardHUD />;
}

export default withPasswordProtect(Home);