import Button from '@mui/material/Button';


const UsersListFooter = () => {
    const handleSearchQuery = () => {
    }

    return (
        <>
            <div className="link">
                <Button className="link__btn" variant="contained" onClick={ handleSearchQuery }>Найти</Button>
            </div>
        </>
    )
}

export default UsersListFooter;
