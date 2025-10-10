import {
  regRoutes,
  epRoutes,
  questRoutes,
  adminRoutes,
} from './config/routes.config';

import { JSX } from 'react';
import { Routes, Route } from 'react-router-dom';
import { appRoutes } from './config/routes.config';

import DefautlLayout from './layouts/Default';
import QuestLayout from './layouts/Questionnaires';
import RegisterLayout from './layouts/Register';
import AdminLayout from './layouts/Admin';
import EPLayout from './layouts/EviningPlans';

import RegLangPage from './pages/Register/Lang';
import RegPreviewPage from './pages/Register/Preview';
import RegPolicyPage from './pages/Register/Policy';
import RegRulesPage from './pages/Register/Rules';
import RegFillingQuestPage from './pages/Register/FillingQuest';
import RegMediaPage from './pages/Register/Media';

import EPPlansPage from './pages/EveningPlans/Plans';
import EPLocationPage from './pages/EveningPlans/Location';

import QuestChatsPage from './pages/Questionnaires/Chats';
import QuestLikesPage from './pages/Questionnaires/Likes';
import QuestProfilePage from './pages/Questionnaires/Profile';
import QuestPsychologistsPage from './pages/Questionnaires/Psychologists';
import QuestVideoPage from './pages/Questionnaires/Video';
import QuestSliderPage from './pages/Questionnaires/Slider';

import DetailsPage from './pages/Details';
import TargetChatPage from './pages/Chat';
import TargetPsychPage from './pages/Psychologist';
import PsychAddVideoPage from './pages/PsychAddVideo';
import ShortsPage from './pages/Shorts';

import AdminChangePage from './pages/Admin/Change';
import AdminUsersListPage from './pages/Admin/UsersList';
import AdminUserInfoPage from './pages/Admin/UserInfo';
import AdminComplaintsListPage from './pages/Admin/ComplaintsList';
import AdminVidoeInfoPage from './pages/Admin/VideoInfo';

import NotFoundPage from './pages/NotFound';
import BlockedPage from './pages/Blocked';
import ErrorPage from './pages/Error';

import './assets/scss/index.scss';


const App = (): JSX.Element => {
  return (
    <Routes>
      <Route element={ <DefautlLayout /> }>

        <Route path={ regRoutes.global } element={ <RegisterLayout /> } >
          <Route path={ regRoutes.inner.preview } element={ <RegPreviewPage /> } />
          <Route path={ regRoutes.inner.policy } element={ <RegPolicyPage /> } />
          <Route path={ regRoutes.inner.rules } element={ <RegRulesPage /> } />
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
          <Route path={ questRoutes.inner.video } element={ <QuestVideoPage /> } />
          <Route path={ questRoutes.inner.psychologists } element={ <QuestPsychologistsPage /> } />
          <Route path={ questRoutes.inner.slider } element={ <QuestSliderPage /> } />
        </Route>

        <Route path={ appRoutes.details } element={ <DetailsPage /> } />
        <Route path={ appRoutes.targetChat } element={ <TargetChatPage /> } />
        <Route path={ appRoutes.targetPsych } element={ <TargetPsychPage /> } />
        <Route path={ appRoutes.psychAddVideo } element={ <PsychAddVideoPage /> } />
        <Route path={ appRoutes.shorts } element={ <ShortsPage /> } />

        <Route path={ adminRoutes.global } element={ <AdminLayout /> } >
          <Route path={ adminRoutes.inner.nav } element={ <AdminChangePage /> } />
          <Route path={ adminRoutes.inner.usersList } element={ <AdminUsersListPage /> } />
          <Route path={ adminRoutes.inner.userInfo } element={ <AdminUserInfoPage /> } />
          <Route path={ adminRoutes.inner.compalintsList } element={ <AdminComplaintsListPage /> } />
          <Route path={ adminRoutes.inner.videoInfo } element={ <AdminVidoeInfoPage /> } />
        </Route>

        <Route path={ appRoutes.blocked } element={ <BlockedPage /> } />
        <Route path={ appRoutes.error } element={ <ErrorPage /> } />
        <Route path={ appRoutes.notFound } element={ <NotFoundPage /> } />

      </Route>
    </Routes>
  )
}

export default App;
