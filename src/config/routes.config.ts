export const appRoutes = {
    notFound: '*',
    blocked: '/blocked',
    error: '/error',
    register: {
        global: '/register',
        inner: {
            preview: '',
            policy: 'policy',
            rules: 'rules',
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

export const regRoutes   = appRoutes.register;
export const epRoutes    = appRoutes.eveningPlans;
export const questRoutes = appRoutes.questionnaires;
export const adminRoutes = appRoutes.admin;

export const toBlocked = appRoutes.blocked;
export const toError = appRoutes.error;

const regGlobRoute   = regRoutes.global;
const previewRoute   = regRoutes.inner.preview;
const policyRoute    = regRoutes.inner.policy;
const rulesRoute     = regRoutes.inner.rules;
const langRoute      = regRoutes.inner.lang;
const fillQuestRoute = regRoutes.inner.fillQuest;
const mediaRoute     = regRoutes.inner.media;

export const toPreview   = `${regGlobRoute}/${previewRoute}`;
export const toPolicy    = `${regGlobRoute}/${policyRoute}`;
export const toRules     = `${regGlobRoute}/${rulesRoute}`;
export const toLang      = `${regGlobRoute}/${langRoute}`;
export const toFillQuest = `${regGlobRoute}/${fillQuestRoute}`;
export const toMedia     = `${regGlobRoute}/${mediaRoute}`;

const evePlansGlobRoute = epRoutes.global;
const plansRoute        = epRoutes.inner.plans;
const locationRoute     = epRoutes.inner.location;

export const toPlans    = `${evePlansGlobRoute}/${plansRoute}`;
export const toLocation = `${evePlansGlobRoute}/${locationRoute}`;

const questGlobRoute = questRoutes.global;
const chatsRoute     = questRoutes.inner.chats;
const likesRoute     = questRoutes.inner.likes;
const profileRoute   = questRoutes.inner.profile;
const psychRoute     = questRoutes.inner.psychologists;
const sliderRoute    = questRoutes.inner.slider;

export const toChats   = `${questGlobRoute}/${chatsRoute}`;
export const toLikes   = `${questGlobRoute}/${likesRoute}`;
export const toProfile = `${questGlobRoute}/${profileRoute}`;
export const toPsych   = `${questGlobRoute}/${psychRoute}`;
export const toSlider  = `${questGlobRoute}/${sliderRoute}`;

export const toDetails     = appRoutes.details;
export const toTargetChat  = appRoutes.targetChat;
export const toTargetPsych = appRoutes.targetPsych;

const adminGlobRoute  = adminRoutes.global;
const changeRoute     = adminRoutes.inner.nav;
const usersListRoute  = adminRoutes.inner.usersList;
const userInfoRoute   = adminRoutes.inner.userInfo;
const complsListRoute = adminRoutes.inner.compalintsList;

export const toChange     = `${adminGlobRoute}/${changeRoute}`;
export const toUsersList  = `${adminGlobRoute}/${usersListRoute}`;
export const toUserInfo   = `${adminGlobRoute}/${userInfoRoute}`;
export const toComplsList = `${adminGlobRoute}/${complsListRoute}`;
