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
            slider: '',
            details: 'details',
        },
    },
    admin: {
        global: '/admin',
        inner: {
            nav: 'change',
            usersList: 'users-list',
            userInfo: 'user-info',
        },
    },
}
