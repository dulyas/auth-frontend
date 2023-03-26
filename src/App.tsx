import { useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './main'
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser'
import UserService from './service/UserService'

function App() {


  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (store.isLoading) {
    return (
      <div>
        Загрузка
      </div>
    )
  }

  if (!store.isAuth) {
    return (
      <>
        <h1>
          Пользователь не авторизован
        </h1>
        <LoginForm />
      </>
    )
  }

  return (
    <>
      <h1>
        {`Пользователь ${store.user.email} авторизован`}
      </h1>
      <h2>
        {store.user.isActivated ? 'Аккаунт активирован' : 'Аккаунт не активирован'}
      </h2>
      <button
        onClick={() => store.logout()}> 
        Выйти
      </button>
      <div>
        <button onClick={getUsers}>
          Получить пользователей
        </button>
        {users.map(user => 
          <div key={user.email}>{user.email}</div>
          )}
      </div>
    </>
  )
}

export default observer(App)
