import { Routes, Route } from 'react-router-dom'
import { appRoutes } from './config/routes.config'

import DefautlLayout from './layouts/Default'
import QuestLayout from './layouts/Questionnaires'
import RegisterLayout from './layouts/Register'
import AdminLayout from './layouts/Admin'

import RegLangPage from './pages/Register/Lang'
import RegPreviewPage from './pages/Register/Preview'
import RegFillingQuestPage from './pages/Register/FillingQuest'
import RegGeoPage from './pages/Register/Geo'
import RegEveningPlansPage from './pages/Register/EveningPlans'

import QuestChatsPage from './pages/Questionnaires/Chats'
import QuestLikesPage from './pages/Questionnaires/Likes'
import QuestProfilePage from './pages/Questionnaires/Profile'
import QuestPsychologistsPage from './pages/Questionnaires/Psychologists'
import QuestSliderPage from './pages/Questionnaires/Slider'

import DetailsPage from './pages/Details'

import AdminChangePage from './pages/Admin/Change'
import AdminUsersListPage from './pages/Admin/UsersList'
import AdminUserInfoPage from './pages/Admin/UserInfo'

import NotFoundPage from './pages/NotFoud'
import BlockedPage from './pages/Blocked'
import ErrorPage from './pages/Error'

import './assets/scss/index.scss'


const App = () => {
  const regRoutes   = appRoutes.register
  const questRoutes = appRoutes.questionnaires
  const adminRoutes = appRoutes.admin
  
  return (
    <>
      <Routes>
        <Route element={ <DefautlLayout /> }>

          <Route path={ regRoutes.global } element={ <RegisterLayout /> } >
            <Route path={ regRoutes.inner.preview } element={ <RegPreviewPage /> } />
            <Route path={ regRoutes.inner.lang } element={ <RegLangPage /> } />
            <Route path={ regRoutes.inner.fillQuest } element={ <RegFillingQuestPage /> } />
            <Route path={ regRoutes.inner.geo } element={ <RegGeoPage /> } />
            <Route path={ regRoutes.inner.eveningPlans } element={ <RegEveningPlansPage /> } />
          </Route>

          <Route path={ questRoutes.global } element={ <QuestLayout /> } >
            <Route path={ questRoutes.inner.chats } element={ <QuestChatsPage /> } />
            <Route path={ questRoutes.inner.likes } element={ <QuestLikesPage /> } />
            <Route path={ questRoutes.inner.profile } element={ <QuestProfilePage /> } />
            <Route path={ questRoutes.inner.psychologists } element={ <QuestPsychologistsPage /> } />
            <Route path={ questRoutes.inner.slider } element={ <QuestSliderPage /> } />
          </Route>

          <Route path={ appRoutes.details } element={ <DetailsPage /> } />

          <Route path={ adminRoutes.global } element={ <AdminLayout /> } >
            <Route path={ adminRoutes.inner.nav } element={ <AdminChangePage /> } />
            <Route path={ adminRoutes.inner.usersList } element={ <AdminUsersListPage /> } />
            <Route path={ adminRoutes.inner.userInfo } element={ <AdminUserInfoPage /> } />
          </Route>

          <Route path={ appRoutes.notFound } element={ <NotFoundPage /> } />
          <Route path={ appRoutes.blocked } element={ <BlockedPage /> } />
          <Route path={ appRoutes.error } element={ <ErrorPage /> } />

        </Route>
      </Routes>
    </>
  )
}

export default App
