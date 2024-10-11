import { Spin } from "antd"; // You can use any loading spinner component
import React, { Suspense } from "react";

const LeafletMap = React.lazy(() => import("./LeafletMap")); // Dynamic import

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spin size="large" />}>
        <LeafletMap />
      </Suspense>
    </div>
  );
}

export default App;
