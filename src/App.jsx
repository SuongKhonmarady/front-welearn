import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./page/user/home/Homepage";
import UserAppLayout from "./ui/user/AppLayout";
import AdminAppLayout from "./ui/admin/Applayout";
import Scholarship from "./page/user/scholarship/ScholarshipList";
import Authentication from "./page/user/auth/Authentication";
import Account from "./page/user/account/Account";
import { UserDataProvider } from "./context/user/UserContext";
import { ScholarshipDataProvider } from "./context/scholarship/ScholarshipContext";
import { SubjectDataProvider } from "./context/subject/SubjectContext";
import QuizList from "./page/user/quiz/QuizList";
import { QuizDataProvider } from "./context/quiz/QuizContext";
import BakDoubListUser from "./page/user/bakDoub/BakDoubList";
import DoQuiz from "./page/user/quiz/components/DoQuiz";
import PrivateRoutes from "./ui/shared/PrivateRoute";
import { useEffect, useState } from "react";
import { getUser } from "./context/user/UserAction";
import Spinner from "./ui/shared/Spinner";
import RouteNotFound from "./ui/shared/RouteNotFound";
import { ToastContainer } from "react-toastify";
import RankList from "./page/user/ranking/RankList";
import { RankDataProvider } from "./context/rank/RankContext";
import QuestionList from "./page/admin/manageQuiz/QuestionList";
import ScholarshipList from "./page/admin/manageScholarship/ScholarshipList";
import ViewPdf from "./page/user/bakDoub/ViewPdf";
import SubjectList from "./page/admin/manageSubject/SubjectList";

export default function App() {
  const [isAdmin, setAdmin] = useState(false);
  const [isGraduate, setGraduate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUser();
      if (res) {
        setAdmin(res.isAdmin);
        setGraduate(res.isGraduate);
        setIsLoading(false);
      } else {
        setAdmin(false);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner isFull={true} />;
  }

  return (
    <Router>
      <UserDataProvider>
        <ScholarshipDataProvider>
          <SubjectDataProvider>
            <QuizDataProvider>
              <RankDataProvider>
                <Routes>
                  {isAdmin ? (
                    <Route element={<AdminAppLayout />}>
                      <Route index element={<SubjectList />} />
                      <Route
                        path="/manageQuestion"
                        element={<QuestionList />}
                      />
                      <Route
                        path="/manageScholarship"
                        element={<ScholarshipList />}
                      />
                      <Route path="/*" element={<RouteNotFound />} />
                    </Route>
                  ) : (
                    <Route element={<UserAppLayout />}>
                      <Route index element={<Homepage />} />
                      <Route element={<PrivateRoutes />}>
                        <Route
                          path="/question/:categoryId/:levelId"
                          element={<DoQuiz />}
                        />
                        <Route
                          path="/quiz"
                          element={<QuizList isGraduate={isGraduate} />}
                          isGraduate={isGraduate}
                        />

                        <Route path="/account" element={<Account />} />
                      </Route>
                      <Route path="/scholarship" element={<Scholarship />} />
                      <Route
                        path="/pdf/:categoryId/:examDateId"
                        element={<ViewPdf />}
                      />
                      <Route
                        path="/authentication"
                        element={<Authentication />}
                      />
                      <Route
                        path="/bakDoubAnswer"
                        element={<BakDoubListUser />}
                      />
                      <Route path="/ranking" element={<RankList />} />
                      <Route path="/*" element={<RouteNotFound />} />
                    </Route>
                  )}
                </Routes>
              </RankDataProvider>
            </QuizDataProvider>
          </SubjectDataProvider>
        </ScholarshipDataProvider>
      </UserDataProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}
