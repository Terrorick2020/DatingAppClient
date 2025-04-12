export const appRoutes = {
    notFound: '/not-found',
    blocked: '/blocked',
    error: '/error',
    register: {
        global: '/register',
        inner: {
            preview: '',
            lang: 'lang',
            fillQuest: 'filling-questionnaire',
            geo: 'geo',
            eveningPlans: 'evening-plans',
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
            physAdd: 'phys-add',
        },
    },
}
