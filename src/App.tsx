import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import SampleTable from "./components/SampleTable";

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <header className="App-header">Formations Take Home assignment</header>
                <div className="table-wrapper">
                    <SampleTable />
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default App;
