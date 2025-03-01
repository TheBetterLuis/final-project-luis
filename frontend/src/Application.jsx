import { Route, Routes } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import TicketViewPage from "./pages/TicketViewPage";
import TestPage from "./pages/TestPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import ProfilePicturePage from "./pages/ProfilePicturePage";
import PublicProfilePage from "./pages/PublicProfilePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import Dashboard from "./pages/DashboardPage";
import CrudPage from "./pages/CrudPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import InvoicesPage from "./pages/InvoicesPage";
import NotFoundPage from "./pages/NotFoundPage";
import Chat from "./pages/Chat";

const Application = () => {
  return (
    <>
      <Flowbite>
        <Routes>
          {/*Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profilepicture" element={<ProfilePicturePage />} />
          <Route
            path="/public-profile/:userID"
            element={<PublicProfilePage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/createticket" element={<CreateTicketPage />} />
          <Route path="/ticket/:ticketID" element={<TicketViewPage />} />
          <Route path="/crud" element={<CrudPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />

          <Route path="/create-invoice" element={<CreateInvoicePage />} />
          <Route path="/invoices/:userID" element={<InvoicesPage />} />

          <Route path="/test" element={<TestPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Chat" element={<Chat />} />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Flowbite>
    </>
  );
};

export default Application;
