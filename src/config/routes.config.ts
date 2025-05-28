export const appRoutes = {
    notFound: '*',
    blocked: '/blocked',
    error: '/error',
    register: {
        global: '/register',
        inner: {
            preview: '',
            lang: 'lang',
            fillQuest: 'filling-questionnaire',
            media: 'media',
        },
    },
    eveningPlans: {
        global: '/evening-plans',
        inner: {
            plans: 'plans',
            location: 'location',
        },
    },
    questionnaires: {
        global: '/questionnaires',
        inner: {
            chats: 'chats',
            likes: 'likes',
            profile: 'profile',
            psychologists: 'psychologists',
            slider: 'slider',
        },
    },
    details: '/slider/details/:id',
    targetChat: '/questionnaires/chats/:id',
    targetPsych: '/questionnaires/psychologists/:id',
    admin: {
        global: '/admin',
        inner: {
            nav: 'change',
            usersList: 'users-list',
            userInfo: 'user-info/:id',
            compalintsList: 'complaints-list',
        },
    },
}

export const toBlocked = appRoutes.blocked;
export const toError = appRoutes.error;

const regGlobRoute   = appRoutes.register.global;
const previewRpute   = appRoutes.register.inner.preview;
const langRoute      = appRoutes.register.inner.lang;
const fillQuestRoute = appRoutes.register.inner.fillQuest;
const mediaRoute     = appRoutes.register.inner.media;

export const toPreview   = `${regGlobRoute}/${previewRpute}`;
export const toLang      = `${regGlobRoute}/${langRoute}`;
export const toFillQuest = `${regGlobRoute}/${fillQuestRoute}`;
export const toMedia     = `${regGlobRoute}/${mediaRoute}`;

const evePlansGlobRoute = appRoutes.eveningPlans.global;
const plansRoute        = appRoutes.eveningPlans.inner.plans;
const locationRoute     = appRoutes.eveningPlans.inner.location;

export const toPlans    = `${evePlansGlobRoute}/${plansRoute}`;
export const toLocation = `${evePlansGlobRoute}/${locationRoute}`;

const questGlobRoute = appRoutes.questionnaires.global;
const chatsRoute     = appRoutes.questionnaires.inner.chats;
const likesRoute     = appRoutes.questionnaires.inner.likes;
const profileRoute   = appRoutes.questionnaires.inner.profile;
const psychRoute     = appRoutes.questionnaires.inner.psychologists;
const sliderRoute    = appRoutes.questionnaires.inner.slider;

export const toChats   = `${questGlobRoute}/${chatsRoute}`;
export const toLikes   = `${questGlobRoute}/${likesRoute}`;
export const toProfile = `${questGlobRoute}/${profileRoute}`;
export const toPsych   = `${questGlobRoute}/${psychRoute}`;
export const toSlider  = `${questGlobRoute}/${sliderRoute}`;

export const toDetails     = appRoutes.details;
export const toTargetChat  = appRoutes.targetChat;
export const toTargetPsych = appRoutes.targetPsych;

const adminGlobRoute  = appRoutes.admin.global;
const changeRoute     = appRoutes.admin.inner.nav;
const usersListRoute  = appRoutes.admin.inner.usersList;
const userInfoRoute   = appRoutes.admin.inner.userInfo;
const complsListRoute = appRoutes.admin.inner.compalintsList;

export const toChange     = `${adminGlobRoute}/${changeRoute}`;
export const toUsersList  = `${adminGlobRoute}/${usersListRoute}`;
export const toUserInfo   = `${adminGlobRoute}/${userInfoRoute}`;
export const toComplsList = `${adminGlobRoute}/${complsListRoute}`;
