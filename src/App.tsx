import { Routes, Route } from 'react-router-dom';
import { appRoutes } from './config/routes.config';

import DefautlLayout from './layouts/Default';
import QuestLayout from './layouts/Questionnaires';
import RegisterLayout from './layouts/Register';
import AdminLayout from './layouts/Admin';
import EPLayout from './layouts/EviningPlans';

import RegLangPage from './pages/Register/Lang';
import RegPreviewPage from './pages/Register/Preview';
import RegFillingQuestPage from './pages/Register/FillingQuest';
import RegMediaPage from './pages/Register/Media';

import EPPlansPage from './pages/EveningPlans/Plans';
import EPLocationPage from './pages/EveningPlans/Location';

import QuestChatsPage from './pages/Questionnaires/Chats';
import QuestLikesPage from './pages/Questionnaires/Likes';
import QuestProfilePage from './pages/Questionnaires/Profile';
import QuestPsychologistsPage from './pages/Questionnaires/Psychologists';
import QuestSliderPage from './pages/Questionnaires/Slider';

import DetailsPage from './pages/Details';
import TargetChat from './pages/Chat';
import TargetPsych from './pages/Psychologist';

import AdminChangePage from './pages/Admin/Change';
import AdminUsersListPage from './pages/Admin/UsersList';
import AdminUserInfoPage from './pages/Admin/UserInfo';
import AdminPhysAddPage from './pages/Admin/PhysAdd';

import NotFoundPage from './pages/NotFound';
import BlockedPage from './pages/Blocked';
import ErrorPage from './pages/Error';

import './assets/scss/index.scss';


const App = () => {
  const regRoutes   = appRoutes.register;
  const epRoutes    = appRoutes.eveningPlans;
  const questRoutes = appRoutes.questionnaires;
  const adminRoutes = appRoutes.admin;
  
  return (
    <>
      <Routes>
        <Route element={ <DefautlLayout /> }>

          <Route path={ regRoutes.global } element={ <RegisterLayout /> } >
            <Route path={ regRoutes.inner.preview } element={ <RegPreviewPage /> } />
            <Route path={ regRoutes.inner.lang } element={ <RegLangPage /> } />
            <Route path={ regRoutes.inner.fillQuest } element={ <RegFillingQuestPage /> } />
            <Route path={ regRoutes.inner.media } element={ <RegMediaPage /> } />
          </Route>

          <Route path={ epRoutes.global } element={ <EPLayout /> }>
            <Route path={ epRoutes.inner.plans } element={ <EPPlansPage /> } />
            <Route path={ epRoutes.inner.location } element={ <EPLocationPage /> } />
          </Route>

          <Route path={ questRoutes.global } element={ <QuestLayout /> } >
            <Route path={ questRoutes.inner.chats } element={ <QuestChatsPage /> } />
            <Route path={ questRoutes.inner.likes } element={ <QuestLikesPage /> } />
            <Route path={ questRoutes.inner.profile } element={ <QuestProfilePage /> } />
            <Route path={ questRoutes.inner.psychologists } element={ <QuestPsychologistsPage /> } />
            <Route path={ questRoutes.inner.slider } element={ <QuestSliderPage /> } />
          </Route>

          <Route path={ appRoutes.details } element={ <DetailsPage /> } />
          <Route path={ appRoutes.targetChat } element={ <TargetChat /> } />
          <Route path={ appRoutes.targetPsych } element={ <TargetPsych /> } />

          <Route path={ adminRoutes.global } element={ <AdminLayout /> } >
            <Route path={ adminRoutes.inner.nav } element={ <AdminChangePage /> } />
            <Route path={ adminRoutes.inner.usersList } element={ <AdminUsersListPage /> } />
            <Route path={ adminRoutes.inner.userInfo } element={ <AdminUserInfoPage /> } />
            <Route path={ adminRoutes.inner.physAdd } element={ <AdminPhysAddPage /> } />
          </Route>

          <Route path={ appRoutes.notFound } element={ <NotFoundPage /> } />
          <Route path={ appRoutes.blocked } element={ <BlockedPage /> } />
          <Route path={ appRoutes.error } element={ <ErrorPage /> } />

        </Route>
      </Routes>
    </>
  )
}

export default App;
