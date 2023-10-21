import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/layout/header/header";
import { tw } from "./util/tw";
import HomePage from "./components/layout/home-page/home-page";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import AuthContextProvider from "./contexts/auth/provider";
import PhotosPage from "./components/layout/photos-page/photos-page";
import AddPhotoPage from "./components/layout/add-photo-page/add-photo-page";
import AuthGuard from "./components/common/auth-guard/auth-guard";
import PhotoPage from "./components/layout/photo-page/photo-page";
import UsersPage from "./components/layout/users-page/users-page";
import ContactsPage from "./components/layout/contacts-page/contacts-page";
import AdminDashPage from "./components/layout/admin-dashboard-page/admin-dashboard-page";
import AdminGuard from "./components/common/auth-guard/admin-guard";

function App() {
  const queryClient = new QueryClient();
  return (
    <AuthContextProvider>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        autoHideDuration={3000}
      >
        <QueryClientProvider client={queryClient}>
          <div
            className={tw(
              "w-full min-h-screen",
              "flex flex-col items-stretch gap-4",
              "bg-black",
              "text-zinc-300"
            )}
          >
            <Header />

            <main className={tw("flex-1", "flex flex-col items-center gap-4")}>
              <Routes>
                <Route path="/">
                  <Route index element={<HomePage />} />

                  <Route path="/photos">
                    <Route index element={<PhotosPage />} />
                    <Route
                      path="add"
                      element={
                        <AuthGuard>
                          <AddPhotoPage />
                        </AuthGuard>
                      }
                    />
                    <Route path=":photoId" element={<PhotoPage />} />
                  </Route>

                  <Route path="/users" element={<UsersPage />} />

                  <Route path="/contacts" element={<ContactsPage />} />

                  <Route path="/admin">
                    <Route index element={<Navigate to="/admin/dashboard" />} />

                    <Route
                      path="dashboard"
                      element={
                        <AdminGuard>
                          <AdminDashPage />
                        </AdminGuard>
                      }
                    />
                  </Route>

                  <Route path="*" element={<>404</>} />
                </Route>
              </Routes>
            </main>

            <footer className="bg-zinc-900 flex flex-col justify-center items-center h-[10vh]">
              Page footer
            </footer>
          </div>
        </QueryClientProvider>
      </SnackbarProvider>
    </AuthContextProvider>
  );
}

export default App;
