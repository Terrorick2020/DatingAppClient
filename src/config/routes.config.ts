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
