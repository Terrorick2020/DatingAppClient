import UsersListHeader from './Header';
import UsersListMain from './Main';
import UsersListFooter from './Footer';


const UsersListContent = () => {
    return (
        <>
            <header className="users-list__header">
                <UsersListHeader />
            </header>
            <main className="users-list__main">
                <UsersListMain />
            </main>
            <footer className="users-list__footer">
                <UsersListFooter />
            </footer>
        </>
    )
}

export default UsersListContent;
