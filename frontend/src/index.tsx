import { fetchJournal } from '@/api/journals';
import queryClient from '@/api/queryClient';
import Camera from '@/pages/Camera';
import Health from '@/pages/Health';
import Home from '@/pages/Home';
import Join from '@/pages/Join';
import JournalCreateForm from '@/pages/Journals/CreateForm';
import Detail from '@/pages/Journals/Detail';
import Journals from '@/pages/Journals/Journals';
import OauthCallback from '@/pages/OauthCallback';
import Profile from '@/pages/Profile';
import Walk from '@/pages/Walk';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import NavbarProvider from '@/components/NavbarProvider';
const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <CookiesProvider>
                <App />
            </CookiesProvider>
        ),
        children: [
            {
                index: true,
                path: '/',
                element: (
                    <NavbarProvider>
                        <Home />
                    </NavbarProvider>
                ),
            },
            {
                path: '/profile',
                element: (
                    <NavbarProvider>
                        <Profile />
                    </NavbarProvider>
                ),
            },
            {
                path: '/health',
                element: <Health />,
            },
            {
                path: '/join',
                element: <Join />,
            },
            {
                path: '/walk',
                element: <Walk />,
            },
            {
                path: '/callback',
                element: <OauthCallback />,
            },
            {
                path: '/camera',
                element: <Camera />,
            },
            {
                path: '/journals/create',
                element: <JournalCreateForm />,
            },
            {
                path: '/journals',
                element: (
                    <NavbarProvider>
                        <Journals />
                    </NavbarProvider>
                ),
            },
            {
                path: '/journals/:journalId',
                element: <Detail />,
                loader: async ({ params }) => {
                    const journalId = Number(params.journalId);
                    return await fetchJournal(journalId);
                },
            },
        ],
    },
]);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
