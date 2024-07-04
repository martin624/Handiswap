import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Buffer } from 'buffer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ContextProvider } from './providers/ContextProvider.tsx';





window.Buffer = Buffer;

// const queryClient = new QueryClient({
//     defaultOptions: { queries: { refetchOnWindowFocus: false } },
// });


const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </ContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
